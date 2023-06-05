const math = {

    /**
     * 
     * @param  {...number} numbers Les nombres à process dans la fonction
     * @returns {number} La somme des nombres process dans la fonctino
     */


    // ... = spread operator -> on va récupérer un nombre indéfini de nombres
    addition: (...numbers) => {

        let result = 0;
        for (const nombre of numbers) {
            result += parseInt(nombre)
        }

        return result;

        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
        // acc -> accumulator qui va traiter chaque valeur (nb), nb -> la valeur traitée par accumulator, 0 -> la valeur initiale
        // return numbers.reduce((acc, nb) => acc + nb, 0)
    }

    // addition = function() {}
}

module.exports = math;