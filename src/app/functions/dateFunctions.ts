export const dateFunction = (value? : number)=> {
    let date = new Date();
    if(value) {
        date.setDate(date.getDate() - value);
    }
    const formattedDate = date.toLocaleDateString('mx-es', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return formattedDate
}