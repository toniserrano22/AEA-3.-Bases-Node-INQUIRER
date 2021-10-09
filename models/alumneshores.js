const { arrayBuffer } = require("stream/consumers");
const Alumne = require("./alumne");

/**
 * _llista :
 *  { uuid-234235324-234234523: {id: uuid-234235324-234234523, nom: 'pepito', hores: 10 }}
 */

class AlumnesHores {
  _llista = {
    abc: 123,
  };

  get llistatArr() {
    const llistat = [];
    Object.keys(this._llista).forEach((key) => {
      const alumne = this._llista[key];
      llistat.push(alumne);
    });

    return llistat;
  }

  constructor() {
    this._llista = {};
  }

  crearAlumne(nom = "", hores) {
    const alumne = new Alumne(nom, hores);
    this._llista[alumne.id] = alumne;
  }
  carregarAlumnesFromArray(alumnes =[]){
    alumnes.forEach((alumne) => {
      this._llista[alumne.id] = alumne;
    })

  }
  llistarAlumnes(){
    console.log();//Soc un salt de linia
    let conta = 0;
    this.llistatArr.forEach(alumne =>{
      const {nom} = alumne;
      conta +=1;
      console.log(`${(conta + '.').green}${(nom + '').yellow}`);

    })
  }

  llistarAlumnes_hores(){
    console.log();//Soc un salt de linia
    let conta = 0;
    this.llistatArr.forEach(alumne =>{
      const {nom, horesFetes} = alumne;
      // const hores = `${horesFetes}.green`//>0 else lo demas

      // const prova = true ? 'hola' : 'adeu';//Condicional ternari

      //La condicio 'ternari' resolt 
      const hores = horesFetes >0 ? `${horesFetes}`.green : `${horesFetes}`.red;      
      conta +=1;
      console.log(`${(conta + '.').green}${('Nom:').yellow} ${(nom + '').cyan} ${('::').green} ${('Hores').yellow} ${hores}`);

    })
  }
  async introNumHores(id,hores){
    const alumne = this._llista[id]
    alumne.horesFetes= hores;
    return alumne.nom;
    console.log(alumne);
  }

  async eliminarAlumne(id2){
    const alumne = this._llista[id2]

    alumne.id = id2;
    delete this._llista[id2]
    return id2;
    console.log(alumne);
  }
}



module.exports = AlumnesHores;