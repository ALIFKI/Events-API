const connection = require('../helpers/mysql')
const helper = require('../helpers/res')
const events = require('../models/events')
const multer = require('multer');
const path     = require('path');
const moment = require('moment')
const queryString = require('querystring')
const Joi = require('@hapi/joi');
const fs = require('../helpers/fs')

const getPage = (_page) =>{
    var page = parseInt(_page)
    if (page && page > 0) {
        return page
    } else {
        return 1
    }
}
const getPerPage = (_limit) =>{
    const limit = parseInt(_limit)
    if (limit && limit >0) {
        return limit
    } else {
        return 5
    }

}
const getNextLink = (_page, _totalPage, _current) => {
    page = parseInt(_page)
    if (page < _totalPage) {
      const generatedPage = {
        page : page + 1
      }
      return queryString.stringify({ ..._current, ...generatedPage })
    } else {

    }
}

const getPrevLink = (_page,_totalPage,_current)=>{
    var page = parseInt(_page)
    if (page > 1 ) {
        const generatedPage = {
            page : page - 1
        }
        return queryString.stringify({..._current,...generatedPage})
    } else {
        
    }
}
const goFirstLink = (_page,_totalPage,_current)=>{
    var page = parseInt(_page)
    if (page > 1 ) {
        const generatedPage = {
            page : 1
        }
        return queryString.stringify({..._current,...generatedPage})
    } else {
        
    }
}

const goLastPage = (_page,_totalPage,_current)=>{
    var page = parseInt(_page)
    if (page < _totalPage ) {
        const generatedPage = {
            page : _totalPage
        }
        return queryString.stringify({..._current,...generatedPage})
    } else {
        
    }
}

const eventScheme = Joi.object({
    image : Joi.string()
            .required(),
    title : Joi.string()
            .required(),
    note : Joi.string()
            .required().min(50).max(255),
    participan : Joi.string()
                .required(),
    date : Joi.string(),
    location : Joi.string()
            .required()
})

const eventSchemeUpdate = Joi.object({
    image : Joi.string(),
    title : Joi.string(),
    description : Joi.string(),
    id_author : Joi.number(),
    id_genre : Joi.number(),
    status : Joi.string(),
    updated_at : Joi.date()
})

module.exports = {
    getEvents : async function(request,response){
        try {
                const query = request.query;
                const rule = {
                    search : query.search,
                    sort   : query.sort,
                    by : query.by,
                    order : query.order
                }
                const totalPage = Math.ceil(await events.getCount()/getPage(query.limit))
                const current_page = query.page
                const startAt = (getPage(query.page) * getPerPage(query.limit)) - getPerPage(query.limit);
                const endAt = parseInt(query.limit)
                const nextLink = getNextLink(query.page,totalPage,query)
                const prevLink = getPrevLink(query.page,totalPage,query)
                const first_page = goFirstLink(query.page,totalPage,query)
                const last_page  = goLastPage(query.page,totalPage,query)
        
                const result = await events.indexSearch(startAt,endAt,rule)
                    result.msg = 'List events';
                    result.pageInfo = {
                        nextLink : nextLink && `/api/events?${nextLink}`,
                        prevLink : prevLink && `/api/events?${prevLink}`,
                        current_page : current_page,
                        total_page : totalPage,
                        firstPage : first_page && `/api/events?${first_page}`,
                        lastPage : last_page && `/api/events?${last_page}`,
                    }
                    return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,200)
        }
    },
    postEvent : async function(request,response){
        const setData = request.body
        if(request.file){
            setData.image = request.file.filename
        }
        try {
            await eventScheme.validateAsync(setData)
            const result = await events.store(setData);
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
    deleteEvents : async function(request,response){
        const id = request.params.id
        try {
            const get = await events.getDetails(id)
            const data = {
                ...get.data
            }
            fs.delete('uploads/'+data.image)
            const result = await events.destroy(id)
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },
    putEvents : async function(request,response){
        const setData = request.body
        setData.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const id = request.params.id
        if(request.file){
            setData.image = request.file.filename
        }
        try {
            await eventSchemeUpdate.validateAsync(setData)
            if(request.file){
                const get = await events.getDetails(id)
                const data = {
                    ...get.data
                }
                fs.delete('uploads/'+data.image)
            }
            const result = await events.edit(setData,id);
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fail',error,500)
        }
    },

    getDetails : async function (request,response) {
        const id = request.params.id
        try {
            const result = await events.getDetails(id)
            return helper.response(response,'success',result,200)
        } catch (error) {
            return helper.response(response,'fails',error,500)
        }
    }
}