require('dotenv').config();
const axios = require('axios');
const { Dog, Temperament} = require('../db')
const {API_KEY} = process.env;
const getApiInfo = async()=>{
    try {
        const ApiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const apiInfo = await ApiUrl.data.map(razas => {
           
        return {
            id: razas.id,
            nombre: razas.name,
            altura: razas.height.metric,
            peso: razas.weight.metric,
            anios_de_vida: razas.life_span,
            createdInDb: false,
            image: razas.image.url,
            temperaments: razas.temperament
        }
    })
    return apiInfo
    } catch (error) {
        console.log(`${error.message}//4//`)
    }
    
}
const getDbInfo = async function(){
    try {
        return await Dog.findAll({
            include: {              
                model: Temperament,        
                attibutes: ['name'],
                through: {
                    attibutes:[],   
                }
            } 
        })
    } catch (error) {
        console.log(`${error.message}3///`)
    }
}; 
const getAllDog = async () =>{
    try {
        const apiInfo = await getApiInfo();
        const DbInfo = await getDbInfo();
        const infototal = apiInfo.concat(DbInfo);
        return infototal
    } catch (error) {
        console.log(`${error.message}//5//`)
    }
    
}
const getallTemperament = async function(){
    try{
    let TemperamentList= await getAllDog();
        const repeated = await TemperamentList.map( t => t.temperaments).toString().replace(/\s+/g, '').split(",").sort();
        const Temperament_sin_repetidas= [... new Set(repeated)]
        Temperament_sin_repetidas.forEach(element => {
            Temperament.findOrCreate({
                where:{name:element}
            })
        });
        const AllTemperamentLists= await Temperament.findAll();
        return AllTemperamentLists.map(t => t.name);
    } catch (error) {
        console.log(error.message)
    }
    
};
module.exports={
    getApiInfo,
    getDbInfo,
    getAllDog,
    getallTemperament

}