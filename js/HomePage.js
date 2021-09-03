let employeePayrollList ;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList = getDataFromLocalStorage();
    document.getElementById('emp_count').innerHTML = employeePayrollList.length;
    createTableContents();
});
let getDataFromLocalStorage = () =>
{
    return localStorage.getItem("EmployeePayrollList")?JSON.parse(localStorage.getItem("EmployeePayrollList")):[];
}
let createTableContents = () =>
{
    const tableHeader = `<tr>
    <th>Image</th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start date</th>
    <th>Actions</th>
</tr>`;
let tableContents = `${tableHeader}`;
    for(const emp of employeePayrollList)
    {
        tableContents = `${tableContents}<tr>
            <td><img class="profile" src="${emp._empProfilePic}" /></td>
            <td>${emp._empName}</td>
            <td>${emp._empGender}</td>
            <td>
            ${getDept(emp._empDept)}
            </td>
            <td>${emp._empSalary}</td>
            <td>${stringifyDate(emp._startDate)}</td>
            <td>
                <img id="${emp._empName}" src="../assets/icons/delete-black-18dp.svg" class="profile" onclick="deleteEmployee(this)" alt="delete" />
                <img src="../assets/icons/create-black-18dp.svg" class="profile" alt="edit" />
            </td>
        </tr>`;
    }
    
    document.getElementById('display_container').innerHTML = tableContents;
}
let getDept = (deptArr) =>
{
    let deptHtml = '';
    for(const dept of deptArr)
    {
        deptHtml = `${deptHtml}<span class="dept_label">${dept}</span>`;
    }
    return deptHtml;
}

/********************************************Delete employee ************************************/
let deleteEmployee = (employee) =>
{
    let empData  = employeePayrollList.find(x => x._empName == employee.id);
    if(!empData)
        return;
    const index = employeePayrollList.map(x => x._empName).indexOf(empData._empName);
    employeePayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
    document.getElementById('emp_count').innerHTML = employeePayrollList.length;
    createTableContents();
}