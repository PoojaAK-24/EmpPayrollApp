const getById = (id) =>
{
    return document.querySelector(`#${id}`);
}

window.addEventListener('DOMContentLoaded', (event) => {
    const name = getById('empName');
    const nameError =  getById('errorName');
    name.addEventListener('input', () =>{
        if(name.value.length == 0)
        {
            nameError.innerHTML = '';
            return;
        }
        try{
            (new EmployeePayrollData()).empName = name.value;
            nameError.innerHTML = '';
        }
        catch(e)
        {
            nameError.innerHTML = e;
        }
    });
    const salary = getById('salary');
    const outputSal =  getById('salaryOutput');
    outputSal.innerHTML = salary.value;
    salary.addEventListener('input', () =>{
        outputSal.innerHTML = salary.value;
    });

    //validates the date
    const date = getById('date');
    const errorDate = getById('errorDate');
    date.addEventListener('input',function(){
        let startDate = `${getById('day').value} ${getById('month').value} ${getById('year').value}`;

        try{
            (new EmployeePayrollData()).startDate = new Date(Date.parse(startDate));
            errorDate.innerHTML="";
        }catch(e){
            errorDate.innerHTML=e;
        }
    });


});