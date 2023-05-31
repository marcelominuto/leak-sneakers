import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== "POST"){
    return res.status(405)
  }

  const fields: Field[] = [
    { name: 'Sneaker:', value: req.body.value },
    { name: 'SKU:', value: req.body.sku },
  ]
  
  if(req.body.store)
    fields.push({ name: 'Loja:', value: req.body.store })
  
  fields.push({ 
    name: 'Data de Lançamento', 
    value: req.body.releaseDate ? req.body.releaseDate : "Em Breve!" 
  })

  const embed: Embed = {
    "title": ":detective: LEAKED!",
    "color": 9275126,
    "description": "",
    "timestamp": new Date(),
    "thumbnail": {
      "url": req.body.image_url
    },
    "image": {
      "url": req.body.image_url
    },
    "footer": {
      "text": "Leak Sneakers"
    },
    "fields": fields
  }

  const payload = { embeds: [embed] }
  const response = await fetch(process.env.WEBHOOK_URI + "?wait=true", {
    "method":"POST", 
    "headers": {"content-type": "application/json" }, 
    "body": JSON.stringify(payload)
  })

  const data = await response.json()

  res.status(200).json(data)


  //Webhook Copping
if(req.body.checked === "true"){
  const fieldsCopping: Field[] = [
    { name: 'Sneaker:', value: req.body.value },
    { name: 'SKU:', value: req.body.sku },
  ]
  
  fieldsCopping.push({ 
    name: 'Data de Lançamento', 
    value: req.body.releaseDate ? req.body.releaseDate : "Em Breve!" 
  })

  if(req.body.description)
  fieldsCopping.push({ name: 'Descrição:', value: req.body.description })

  const embedCopping: Embed = {
    "title": "CONFIRMADO NO BRASIL! :flag_br:",
    "color": 9275126,
    "description": "",
    "timestamp": new Date(),
    "thumbnail": {
      "url": req.body.image_url
    },
    "image": {
      "url": req.body.image_url
    },
    "footer": {
      "text": "Copping - Equipe Leak Sneakers"
    },
    "fields": fieldsCopping
  }

  const payloadCopping = { embeds: [embedCopping] }
  const responseCopping = await fetch(process.env.COPPING_URI + "?wait=true", {
    "method":"POST", 
    "headers": {"content-type": "application/json" }, 
    "body": JSON.stringify(payloadCopping)
  })

  const dataCopping = await responseCopping.json()

  //res.status(200).json(dataCopping)
  
}
}