/// <reference path="./global.d.ts" />
'use strict'

/** @param {import('fastify').FastifyInstance} app */
module.exports = async(app, opts) => {
    app.post('/save-with-tags', async(req, reply) => {
      const { tags, url, title } = req.body
      const res = await app.platformatic.entities.tag.find({
        where: {
          name: {
            in: tags
          }
        }
      });
      const existing = res.map(value => {return value.name});
      const toAdd = tags.filter(value=>!existing.includes(value));
      let finalTags = res;

      if (toAdd.length > 0) {
        const inserted = await app.platformatic.entities.tag.insert({
            fields: ["id"],
            inputs: toAdd.map(value=> {return {name: value}})
        });
        finalTags = finalTags.concat(inserted);
      }

      const savedLink = await app.platformatic.entities.link.save({
        input: {
            title: title,
            link: url,
        }
      });

      await app.platformatic.entities.linkTag.insert({
        inputs: finalTags.map(value => {
            return {tagId: value.id, linkId: savedLink.id} 
        })
      });

      if (savedLink) {
        return savedLink
      }
      return null
    });
  }