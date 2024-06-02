document.addEventListener('DOMContentLoaded', () => {
    const students = [
        { name: 'Amin', fatherName: 'Ahmad', rollNumber: '01', className: '8th' },
        { name: 'Faheem', fatherName: 'Hassan', rollNumber: '02', className: '9th' },
        { name: 'Zaib', fatherName: 'Hussain', rollNumber: '03', className: '10th' },
        { name: 'Mahir', fatherName: 'Ali', rollNumber: '04', className: '8th' },
        { name: 'Ayan', fatherName: 'Umar', rollNumber: '05', className: '9th' },
        { name: 'Khadim', fatherName: 'Khalid', rollNumber: '06', className: '10th' },
        { name: 'Sanaullah', fatherName: 'Sami', rollNumber: '07', className: '8th' },
        { name: 'Safeer', fatherName: 'Saad', rollNumber: '08', className: '9th' },
        { name: 'Lateef', fatherName: 'Farooq', rollNumber: '09', className: '10th' },
        { name: 'Hafeez', fatherName: 'Yasir', rollNumber: '10', className: '8th' }
    ];

    const studentList = document.getElementById('student-list');
    const addStudentForm = document.getElementById('add-student-form');
    const totalPresent = document.getElementById('total-present');
    const totalAbsent = document.getElementById('total-absent');
    const totalLeave = document.getElementById('total-leave');

    function renderStudents() {
        studentList.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.fatherName}</td>
                <td>${student.rollNumber}</td>
                <td>${student.className}</td>
                <td class="present-count">0</td>
                <td class="absent-count">0</td>
                <td class="leave-count">0</td>
                <td>
                    <label><input type="radio" name="attendance-${index}" value="present"> Present</label>
                    <label><input type="radio" name="attendance-${index}" value="absent"> Absent</label>
                    <label><input type="radio" name="attendance-${index}" value="leave"> On Leave</label>
                </td>
            `;
            studentList.appendChild(row);
        });
    }

    function updateSummary() {
        let presentCount = 0;
        let absentCount = 0;
        let leaveCount = 0;

        document.querySelectorAll('.present-count').forEach(cell => presentCount += parseInt(cell.textContent));
        document.querySelectorAll('.absent-count').forEach(cell => absentCount += parseInt(cell.textContent));
        document.querySelectorAll('.leave-count').forEach(cell => leaveCount += parseInt(cell.textContent));

        totalPresent.textContent = presentCount;
        totalAbsent.textContent = absentCount;
        totalLeave.textContent = leaveCount;
    }

    addStudentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('student-name').value;
        const fatherName = document.getElementById('father-name').value;
        const rollNumber = document.getElementById('roll-number').value;
        const className = document.getElementById('class-name').value;
        students.push({ name, fatherName, rollNumber, className });
        renderStudents();
    });

    document.addEventListener('change', (event) => {
        if (event.target.matches('input[type="radio"]')) {
            const index = parseInt(event.target.name.split('-')[1]);
            const attendanceType = event.target.value;
            const row = event.target.closest('tr');
            const presentCountCell = row.querySelector('.present-count');
            const absentCountCell = row.querySelector('.absent-count');
            const leaveCountCell = row.querySelector('.leave-count');

            let presentCount = parseInt(presentCountCell.textContent);
            let absentCount = parseInt(absentCountCell.textContent);
            let leaveCount = parseInt(leaveCountCell.textContent);

            // Reset previous selection
            const previousSelection = row.dataset.previousSelection;
            if (previousSelection) {
                switch (previousSelection) {
                    case 'present':
                        presentCount--;
                        break;
                    case 'absent':
                        absentCount--;
                        break;
                    case 'leave':
                        leaveCount--;
                        break;
                }
            }

            // Update counts based on new selection
            switch (attendanceType) {
                case 'present':
                    presentCount++;
                    break;
                case 'absent':
                    absentCount++;
                    break;
                case 'leave':
                    leaveCount++;
                    break;
            }

            // Update cell contents
            presentCountCell.textContent = presentCount;
            absentCountCell.textContent = absentCount;
            leaveCountCell.textContent = leaveCount;

            // Store the new selection
            row.dataset.previousSelection = attendanceType;

            // Update the summary table
            updateSummary();
        }
    });

    renderStudents();
    updateSummary();
});