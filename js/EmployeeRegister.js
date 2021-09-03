const getById = (id) =>
{
    return document.querySelector(`#${id}`);
}
let isUpdate = false;
let empObj = {};
//**********************************************ADD event listener on content loaded *************************/
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
            checkName(name.value);
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
            checkStartDate(new Date(Date.parse(startDate)));
            errorDate.innerHTML="";
        }catch(e){
            errorDate.innerHTML=e;
        }
    });

    //update
    checkForUpdate();
});
let checkForUpdate = () =>
{
  const editEmpJson = localStorage.getItem("editEmp");
  isUpdate = editEmpJson ? true:false;
  if(!isUpdate)
    return;
  empObj = JSON.parse(editEmpJson);
  setForm();
}

/****************************************Save**********************************************************/
const save=(event)=>
{
  event.preventDefault();
  event.stopPropagation();
  try
  {
    setEmpObj();
    createAndUpdateStorage();
    resetForm();
    window.location.replace(siteProperties.home_page);
  }
  catch(e)
  {
    return;
  }
}
const setEmpObj = () =>
{
  if(!isUpdate)
      empObj.id = createNewEmployeeId();
    empObj._empName = getById('empName').value;
    empObj._empProfilePic = getSelectedValues('[name=profile]').pop();
    empObj._empGender = getSelectedValues('[name=gender]').pop();
    empObj._empDept=getSelectedValues('[name=dept]');
    empObj._empSalary=getById('salary').value;
    empObj._notes=getById('notes').value;
    let date=`${getById('day').value} ${getById('month').value} ${getById('year').value}`;
    empObj._startDate = date;
}
/*****************************************Create data*********************************/
const createEmployeePayrollData = (id) =>
{
  let employeePayrollData=new EmployeePayrollData();
  if(!id)
    employeePayrollData.id = createNewEmployeeId();
  else
    employeePayrollData.id = id;
  setEmployeePayrollData(employeePayrollData);
  return employeePayrollData;
}
/*************************************************Set value to getters and setters**************/
const setEmployeePayrollData = (employeePayrollData) =>
{
  try{
    employeePayrollData.empName = empObj._empName;
  }
  catch(e)
    {
        getById('errorName').innerHTML = e;
        throw e;
    }
    employeePayrollData.empProfilePic=empObj._empProfilePic;
    employeePayrollData.empGender=empObj._empGender;
    employeePayrollData.empDept=empObj._empDept;
    employeePayrollData.empSalary=empObj._empSalary;
    employeePayrollData.notes=empObj._notes;
    try
    {
        employeePayrollData.startDate=new Date(Date.parse(empObj._startDate));
    }
    catch
    {
        getById('errorDate').innerHTML = e;
        throw e;
    }
    alert(employeePayrollData.toString());
}
/*********************************************Create employee id***********************************************************/
const createNewEmployeeId = () =>
{
  let empId = localStorage.getItem('employeeId');
  empId = !empId ? 1 : (parseInt(empId)+1).toString();
  localStorage.setItem('employeeId',empId);
  return empId;
}
//storing in local storage
function createAndUpdateStorage(employeePayrollData)
{
  let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList)
  {
    let empData = employeePayrollList.find(emp => emp.id == empObj.id);
    if(!empData)
      employeePayrollList.push(empObj);
    else
    {
      const index = employeePayrollList.map(x => x.id).indexOf(empData.id);
      employeePayrollList.splice(index,1,empObj);
    }
  }
  else
  {
    employeePayrollList=[empObj];
  }
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
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
/******************************************RESET FORM******************************************************************/
const resetForm=() =>
{
  setValue('#empName','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=dept]');
  setValue('#salary','');
  getById('salaryOutput').value = 450000;
  getById('errorDate').innerHTML = "";
  setValue('#notes','');
  getById('day').value = 1;
  getById('month').value = 'Jan';
  getById('year').value = 2021;
  
}
/**************************************Set form for update******************************************************/
const setForm = () =>
{
  setValue('#empName',empObj._empName);
  setValue('#salary',empObj._empSalary);
  setValue('#notes',empObj._notes);
  getById('salaryOutput').value = empObj._empSalary;
  let date = stringifyDate(empObj._startDate).split(" ");
  getById('day').value = date[0];
  getById('month').value = date[1];
  getById('year').value =date[2];
  setSelectedValues('[name=profile]',empObj._empProfilePic);
  setSelectedValues('[name=gender]',empObj._empGender);
  setSelectedValues('[name=dept]',empObj._empDept);
}
/****************************Methods for reset*************************************/
const setValue=(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
  }
  
const unsetSelectedValues=(property)=>{
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item=>{
        item.checked=false;
    });
}

const setSelectedValues = (property,value) =>
{
  let items = document.querySelectorAll(property);
  items.forEach(item => {
    if(Array.isArray(value))
    {
      if(value.includes(item.value))
      {
        item.checked = true;
      }
    }
    else if(item.value==value)
    {
      item.checked=true;
    }
  });
}