export  const dateFunction = ()=> {
    let date = new Date();
    const formattedDate = date.toLocaleDateString('mx-es', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return formattedDate
}
