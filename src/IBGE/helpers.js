export const alphabeticalOrder = (list) => {
    const sortedList = list.sort(
        (a, b) => (
            a.value.localeCompare(b.value)
        )
    )
    return sortedList;
}


export const removeObjKey = (data) => {
    const result = data.map(
        ({regiao, ...rest}) => {                        
            return {
                id: rest.id,
                sigla: rest.sigla,
                value: rest.nome
            }
        }    
    );
    
    const sortedList = alphabeticalOrder(result)

    //const teste = sortedList.map((e) => {
   //     return {
    //        id: e.id,
    //        sigla: e.sigla,
   //         value: e.nome
    //    }
   // })
    return sortedList;
   // return teste;

};	
