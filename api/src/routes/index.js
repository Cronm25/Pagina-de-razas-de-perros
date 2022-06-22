const { Router } = require('express');
const { Dog , Temperament } = require('../db');
const funcion__ = require('../ApiInfo/ApiInfo')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs',async (req,res)=>{
    const { name } = req.query;
    if(name){
        try {
                let Dogs= await funcion__.getAllDog();
                let DogName = await Dogs.filter(el => el.nombre.toLowerCase().includes(name.toLowerCase()))
                DogName.length ?
                res.status(200).json(DogName) : 
                res.status(404).send("Receta no encontrada")
                
        } catch (error) {
            console.log(`${error.message}1///`)
        }
    }else{
        try {
            res.status(200).json(await funcion__.getAllDog())
        } catch (error) {
            console.log(`${error.message}2///`)
        }
       
    }
})
router.get('/dogs/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const Dogs= await funcion__.getAllDog();
        if(id){
            const dog= await Dogs.filter(d => d.id == id)
            dog.length ?
            res.status(200).json(dog[0]) : 
            res.status(404).send("Receta por id no encontrada")
        }
        res.status(404).send("Ingresa una id")
    } catch (error) {
        console.log(error.message)
    }
    
})
router.get('/temperaments',async(req,res)=>{
    //try {
    //    const Temperaments = await Temperament.findAll();
    //    Temperaments.length ?
    //        res.send(Temperaments) :
    //        res.send('error al traer dietas');
    //} catch (e) {
    //    next(e)
    //}
    try {
        let TemperamentList= await funcion__.getAllDog();
        const repeated = await TemperamentList.map( t => t.temperaments).toString().replace(/\s+/g, '').split(",").sort();
        const Temperament_sin_repetidas= [... new Set(repeated)]
        Temperament_sin_repetidas.forEach(element => {
            Temperament.findOrCreate({
                where:{name:element}
            })
        });
        const AllTemperamentLists= await Temperament.findAll();
        res.status(200).json(AllTemperamentLists.map(t => t.name));
    } catch (error) {
        console.log(error.message)
    }
    
})
router.post('/dogs', async(req,res)=>{
    try {
        let {nombre, altura, peso, anios_de_vida, image,temperaments,createdInDb}= req.body;
        let Crear_Dog = await Dog.create({
            nombre,
            altura,
            peso,
            anios_de_vida,
            image,
            createdInDb
        })
        temperaments.map(async d => {
            const dbTemperament = await Temperament.findOrCreate({
                where: {
                    name: d
                }
            })
            Crear_Dog.addTemperament(dbTemperament[0]);
        })
        res.status(201).send("Raza creada")
    } catch (error){
        console.log(error.message)
    }
})
//router.put("/update/:id",async(req,res)=>{
//    try {
//        let id=req.params.id
//        let {nombre, altura, peso, anios_de_vida, image,temperaments,createdInDb}= req.body;
//        let UpdateDog = await Dog.update({
//            nombre,
//            altura,
//            peso,
//            anios_de_vida,
//            image,
//            createdInDb
//        },{
//        where:{
//           id
//        }}
//        )
//        let temperamentos = await Temperament.findAll({
//            where: {name: temperaments}
//        })
//        await UpdateDog.addTemperament(temperamentos)
//        res.status(201).send("Raza actualizada")
//    } catch (error){
//        console.log(error.message)
//    }
//
//})
router.put("/update/:id", async (req,res) => {
    let id=req.params.id
    let {nombre, altura, peso, anios_de_vida, image,temperaments,createdInDb}= req.body;
    let Alltemperaments = await funcion__.getallTemperament();
    try{
        let dog = await Dog.findByPk(id)
        if(dog){
            let UpdateDog = await dog.update({
                nombre,
                altura,
                peso,
                anios_de_vida,
                image,
                createdInDb
            })
                let temperamentos = await Temperament.findAll({
                    where: {name : temperaments}
                })
                await UpdateDog.addTemperament(temperamentos)
            res.status(200).send("Raza actualizado")
        }
    } catch(e){
        res.status(404).send(e.message)
    }
})
router.delete("/delete/:id",(req ,res)=>{
    try {
        let id=req.params.id
         Dog.destroy({
            where:{
                id
            }
        })
        res.status(200).send("Raza Eliminada")
    } catch (error) {
        res.status(400).send("La raza no pudo eliminarse")
    }
})
module.exports = router;