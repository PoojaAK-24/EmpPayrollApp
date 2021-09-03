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

/****************************************Save**********************************************************/
const save=()=>
{
  try
  {
    let employeePayrollData=createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  }
  catch(e)
  {
    return;
  }
}
const createEmployeePayroll = () =>
{
    let employeePayrollData=new EmployeePayrollData();
    try
    {
    employeePayrollData.empName=getById('empName').value;
    }
    catch(e)
    {
        getById('errorName').innerHTML = e;
        throw e;
    }
    employeePayrollData.empProfilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData.empGender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.empDept=getSelectedValues('[name=dept]');
    employeePayrollData.empSalary=getById('salary').value;
    employeePayrollData.notes=getById('notes').value;
    let date=`${getById('day').value} ${getById('month').value} ${getById('year').value}`;

    try
    {
        employeePayrollData.startDate=new Date(Date.parse(date));
        getById('errorDate').innerHTML = "";
    }
    catch
    {
        getById('errorDate').innerHTML = e;
        throw e;
    }
  //alert(employeePayrollData.toString());
  return employeePayrollData;
}
//storing in local storage
function createAndUpdateStorage(employeePayrollData)
{
  let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList!=undefined)
  {
    employeePayrollList.push(employeePayrollData);
  }
  else{
    employeePayrollList=[employeePayrollData];
  }
  alert("Successfully saved into local storage");
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const setTextValue=(id,value) =>
{
  const element=getById(id);
  element.textContent=value;
}

const getSelectedValues=(proertyValue)=>
{
  let allItems=document.querySelectorAll(proertyValue);
  let selectedItems=[];
  allItems.forEach(item=>
    {
        if(item.checked)
        selectedItems.push(item.value);
    });
    return selectedItems;
}