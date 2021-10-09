require("colors");

const { inquirerMenu, pausa, nouAlumne, alumneSelect, introHores,elimiSelect,confirmar } = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");

const AlumnesHores = require("./models/alumneshores");

const main = async () => {
  let opt = "";
  const alumnes = new AlumnesHores();


  const alumneDB = readDB();

  if(alumneDB){//si hi ha dades carrégales
    alumnes.carregarAlumnesFromArray(alumneDB)


  }


  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const nomAlumne = await nouAlumne("Nom alumne:");
        alumnes.crearAlumne(nomAlumne, 0);
        // const alumne = new Alumne("Ricard", 10);
        // console.log(alumne);
        break;

      case "2":
      alumnes.llistarAlumnes()
        break;

      case "3":
        alumnes.llistarAlumnes_hores()
        break;

      case "4":
        const id1 = await alumneSelect( alumnes.llistatArr);
        if(id1 !== '0'){
          const hores = await introHores("Hores Fetes:");
          const nomAlumne = await alumnes.introNumHores(id1,hores);
          console.log(`Alumne: ${nomAlumne} ${'::'.yellow} ${hores} hores guardades`);

        }


        console.log(id1);
        break;

      case "5": 
        const id2 = await elimiSelect (alumnes.llistatArr);
        
        if (id2 !=='0'){
          const confirm = await confirmar(``)
          
          if(confirm !== false){
            alumnes.eliminarAlumne(id2);
            
            console.log('Alumne Eliminat');

          }else{
            console.log('El alumne no ha sigut eliminat');
          }

        }
        break;

      default:
        break;
    }

    guardarDB(alumnes.llistatArr);

    await pausa();
  } while (opt !== "0");
};

main();