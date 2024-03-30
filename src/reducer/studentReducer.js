// studentReducer.js

const studentReducer = (state, action) => {
    if(action.type === "SET_LOADING") {
        return {
            ...state,
            isLoading: true
        };
    }
    if(action.type === "API_ERROR") {
        return {
            ...state,
            isLoading: false,
            isError: true
        };
    }
    if(action.type === "SET_API_DATA") {
        return {
            ...state,
            isLoading: false,
            students: action.payload,
            originalStudents: action.payload // Store the original unfiltered list of students

        };
    }
    if (action.type === "SEARCH_STUDENT") {
        const searchQuery = action.payload.toLowerCase();
    
        if (searchQuery === '') {
            // If search query is empty, sort students by roll number
            const sortedStudents = state.originalStudents.slice().sort((a, b) => {
                const rollNumberA = a.roll;
                const rollNumberB = b.roll;
    
                // Extracting the numeric part of the roll number
                const numericPartA = parseInt(rollNumberA.slice(1));
                const numericPartB = parseInt(rollNumberB.slice(1));
    
                // Comparing the numeric parts of the roll numbers
                if (numericPartA < numericPartB) return -1;
                if (numericPartA > numericPartB) return 1;
    
                // If numeric parts are equal, compare the alphabetic parts
                const alphabeticPartA = rollNumberA.charAt(0);
                const alphabeticPartB = rollNumberB.charAt(0);
    
                // Comparing alphabetic parts using string comparison
                return alphabeticPartA.localeCompare(alphabeticPartB);
            });
    
            return {
                ...state,
                students: sortedStudents
            };
        }
    
        // Filter students based on the search query
        const filteredStudents = state.originalStudents.filter(student => {
            // Filter logic based on your requirements, here it checks if any field contains the search query
            for (let key in student) {
                if (typeof student[key] === 'string' && student[key].toLowerCase().includes(searchQuery)) {
                    return true;
                }
            }
            return false;
        });
    
        return {
            ...state,
            students: filteredStudents
        };
    }
    
    
    

    if (action.type === "FILTER_STUDENT") {
        const { cat, stat, bg, deg } = action.payload;
    
        // Retrieve the original unfiltered list of students from state
        const originalStudents = state.originalStudents || state.students;
    
        const filteredStudents = originalStudents.filter(student => {
            if (cat && cat.length > 0 && !cat.includes(student.category)) {
                return false;
            }
            if (bg && bg.length > 0 && !bg.includes(student.bloodGroup)) {
                return false;
            }
            if(stat && stat.length > 0 && !stat.includes(student.address)){
                return false;
            }
            if(deg && deg.length > 0 && !deg.includes(student.degree)){
                return false;
            }
            return true;
        });
    
        return {
            ...state,
            students: filteredStudents,
            // Store the original unfiltered list of students for future filtering
            originalStudents: originalStudents
        };
    }
    
    


    if(action.type === "GET_SORT_VALUE") {
        // Sorting logic based on sorting value
        let sortedStudents = [];
        switch(action.payload) {
            case "CGPA_HIGH_TO_LOW":
                sortedStudents = state.students.slice().sort((a, b) => b.cgpa - a.cgpa);
                break;
            case "CGPA_LOW_TO_HIGH":
                sortedStudents = state.students.slice().sort((a, b) => a.cgpa - b.cgpa);
                break;
            case "ROLL_NUMBER":
                sortedStudents = state.students.slice().sort((a, b) => {
                    const rollNumberA = a.roll;
                    const rollNumberB = b.roll;
            
                    // Extracting the numeric part of the roll number
                    const numericPartA = parseInt(rollNumberA.slice(1));
                    const numericPartB = parseInt(rollNumberB.slice(1));
            
                    // Comparing the numeric parts of the roll numbers
                    if (numericPartA < numericPartB) return -1;
                    if (numericPartA > numericPartB) return 1;
            
                    // If numeric parts are equal, compare the alphabetic parts
                    const alphabeticPartA = rollNumberA.charAt(0);
                    const alphabeticPartB = rollNumberB.charAt(0);
            
                    // Comparing alphabetic parts using string comparison
                    return alphabeticPartA.localeCompare(alphabeticPartB);
                });
                break;
            case "JEE_SCORE_LOW_TO_HIGH":
                sortedStudents = state.students.slice().sort((a, b) => a.score - b.score);
                break;
            case "JEE_SCORE_HIGH_TO_LOW":
                sortedStudents = state.students.slice().sort((a, b) => b.score - a.score);
                break;
            case "DOB_YOUNGER_TO_OLDER":
                sortedStudents = state.students.slice().sort((a, b) =>  new Date(b.dob) - new Date(a.dob));
                break;
            case "DOB_OLDER_TO_YOUNGER":
                sortedStudents = state.students.slice().sort((a, b) =>  new Date(a.dob) - new Date(b.dob));
                break;
            default:
                sortedStudents = state.students;
        }
        
        return {
            ...state,
            students: sortedStudents
        };
    }
    
    return state;
};

export default studentReducer;