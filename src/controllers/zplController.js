import connection from "../dbStrategy/postgres.js";
import dayjs from "dayjs";

export async function teste(req,res){
  res.send("hello")
}

export async function getFromNFC(req, res) {

  try {
   const result = await connection.query(
      `SELECT * FROM nfcwatch;`
    );
    const response = result.rows

    return res.status(201).send (response);
  } 
  catch (error) {
    return res.status(500).send(error);
  }
}


export async function postFromNFC(req, res) {

  const { teste, userId } = req.body;
  console.log(teste, userId)
  try {
    await connection.query(
      `INSERT INTO nfcwatch ("userId", "teste") VALUES ($1, $2);`, [ userId, teste]
    );

    return res.status(201).send ('Ok');
  } 
  catch (error) {
    return res.status(500).send(error);
  }
}

export async function postZPL(req, res) {

    const { script, zplname } = req.body;
    const { id } = res.locals;
  
    try {
      await connection.query(
        `INSERT INTO zpls ("userId", "script", "zplname") VALUES ($1, $2, $3);`, [id, script, zplname]
      );
  
      return res.status(201).send ('Ok');
    } 
    catch (error) {
      return res.status(500).send(error);
    }
}

export async function getAllZPL(req,res){
  
  const {id}=res.locals.id

  try{
    const queryResponse = await connection.query(`SELECT * FROM zpls`);

    const response = {
      zplname: queryResponse.rows[0].zplname,
      script: queryResponse.rows[0].script,
      data: dayjs(queryResponse.rows[0].createdAt).format('DD/MMMM/YYYY')
    }

    return res.status(200).send(response)
  }catch{

  }
}

export async function getZPLById(req, res){

  const id  = req.params.id;
  //console.log("search for: "+ id )
  try {
    const queryResponse = await connection.query(
      `SELECT id, "script", "createdAt" FROM zpl WHERE id = $1;`, [id]
    );
    //console.log(queryResponse)
    //console.log(queryResponse.rows)

    const response = {
      id: id,
      script: queryResponse.rows[0].script,
      createdAt: queryResponse.rows[0].createdAt
    };  

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error);
  }

}

export async function openZPLshorten(req, res){

  const { zplname } = req.params;

  try{ 
    const { rows: zpl } = await connection.query(
      `SELECT * FROM zpl WHERE "zplname" = $1`, [zplname]
    );

    if(!zplname){
      return res.status(404).send("nao existe essa zpl...")
    }

    //return res.status(200).send("funcionou");
    return res.redirect(zpl[0].script);
    
  }
  catch (error){
    return res.status(400).send(error);
  }
}

export async function deleteURLid(req, res){

  const id  = req.params.id;

  try {
    const user_id = res.locals.id;

    const selectResponse = await connection.query(
      `SELECT * FROM links WHERE links.id=$1;` , [id]
    );

    if(selectResponse.rows.length<1){
      return res.sendStatus(404);
    }
    
    let deleteResponse;

    if(selectResponse.rows[0].userId==user_id){
      
      deleteResponse = await connection.query(
        `DELETE FROM links WHERE links.id=$1;` , [id]
      );

    }else{
      return res.sendStatus(401);
    }

    if(deleteResponse.rowCount<1){
      return res.sendStatus(404);
    }

    return res.sendStatus(200);

  } catch (error) {
    return res.status(500).send(error);
  }

}
