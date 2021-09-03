class EmployeePayrollData
{
    get id()
    {
        return this._id;
    }
    set id(id)
    {
        if(id!=null)
            this._id = id;
        else
            throw `id Value is null`;
    }
    get empName()
    {
        return this._empName;
    }
    set empName(name)
    {
        let namePattern = new RegExp('^[A-Z]{1}[a-z]{2,}$');

            if(!namePattern.test(name))
                throw `Name is in Incorrect Format`;
            else
                this._empName=name;
    }
    get empGender()
    {
        return this._empGender;
    }
    set empGender(gender)
    {
        //pattern for gender either M or F
        let genderPattern = new RegExp('^male$|^female$|^others$');
        if(genderPattern.test(gender))
            this._empGender=gender;
        else
            throw "Error! gender format is incorrect";
    }
    get empProfilePic()
    {
        return this._empProfilePic;
    }
    set empProfilePic(profilePic)
    {
        if(profilePic!=null)
            this._empProfilePic = profilePic;
        else
            throw `profile Value is null`;
    }
    get empDept()
    {
        return this._empDept;
    }
    set empDept(dept)
    {
        if(dept!=null)
            this._empDept = dept;
        else
            throw `Dept Value is null`;
    }
    get empSalary()
    {
        return this._empSalary;
    }
    set empSalary(salary)
    {
        if(salary!=null)
            this._empSalary = salary;
        else
            throw `salary Value is null`;
    }
    get startDate()
    {
        return this._startDate;
    }
    set startDate(date)
    {
        let now = new Date();
        
        if(date!=null)
        {
            if(date>now) 
                throw "Start date is a future date";
            var diff=Math.abs( now.getTime() - date.getTime());
            if(diff/(1000*60*60*24)>30) 
                throw "Start date is beyond 30 days";
            this._startDate = date;
        }
        else
            throw `date Value is null`;
    }
    get notes()
    {
        return this._notes;
    }
    set notes(notes)
    {
        if(notes!=null)
            this._notes = notes;
        else
            throw `notes Value is null`;
    }
    //to string method
    toString()
    {
        return `Id = ${this._id} Name = ${this._empName} Gender = ${this._empGender} Profile Pic = ${this._empProfilePic} Dept = ${this._empDept} Salary = ${this._empSalary} Date = ${this._startDate} Notes = ${this._notes}`;
    }

    

}