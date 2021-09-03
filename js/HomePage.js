window.addEventListener('DOMContentLoaded', (event) => {
    createTableContents();
});
let employeePayrollList = [
    {
        _empName:'Pooja',
        _empGender:'Female',
        _empDept:['Hr','Dev'],
        _empSalary:'450000',
        _startDate:'15 Dec 1999',
        _notes:'',
        _empProfilePic:'../assets/profile-images/Ellipse -5.png'
    }
]
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
                <img src="../assets/icons/delete-black-18dp.svg" alt="delete" />
                <img src="../assets/icons/create-black-18dp.svg" alt="edit" />
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