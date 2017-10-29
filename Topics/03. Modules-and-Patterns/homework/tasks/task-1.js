/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
  var Course = {
    init: function(title, presentations) {
      validatePresentations(presentations);
      validateTitle(title);

      this._title = title;
      this._presentations = presentations;
      this.students = [];
      this.generateId = getId();

      return this;
    },
    addStudent: function(name) {
      studentNameValidation(name);

      let id = this.generateId(),
          names = name.split(' ');

      this.students.push({
        firstname: names[0],
        lastname: names[1],
        id,
        examResult: 0,
        homeworks: 0
      });

      return id;
    },
    getAllStudents: function() {
      let studentsToReturn = [];

      this.students.forEach(student => {
        studentsToReturn.push({
          firstname: student.firstname,
          lastname: student.lastname,
          id: student.id
        })
      })

      return studentsToReturn;
    },
    submitHomework: function(studentID, homeworkID) {
      let studentExists = false;

      this.students.forEach(student => {
        if(studentID === student.id) {
          studentExists = true;
        }
      });

      if(!studentExists) {
        throw new Erro('Student does not exist');
      }

      if(this._presentations.length < homeworkID || homeworkID <= 0) {
        throw new Error('Invalid presentation ID');
      }

      this.students.forEach(student => {
        if(studentID === student.id) {
          student.homeworks += 1;
        }
      });
    },
    pushExamResults: function(results) {
      if(!results) {
        throw new Error('Missing results');
      } else if(!Array.isArray(results)) {
        throw new Error('Results must be array');
      }

      let courseStudents = this.students;

      results.forEach(student => {
        if(typeof student !== 'object') {
          throw new Error('Student must be object, containing ID and SCORE');
        }

        if(!student.StudentID || !student.score) {
          throw new Error('Missing student parameter');
        } else if(typeof student.StudentID !== 'number' || typeof student.score !== 'number') {
          throw new Error('Invalid student parameters type');
        }

        if(student.StudentID < 0 || courseStudents.length < student.StudentID) {
          throw new Error('Invalid Student ID');
        }

        courseStudents.forEach(st => {
          if (st.id === student.StudentID) {
            if(st.examResult !== 0) {
              throw new Error('This student already have exam result');
            }

            st.examResult = student.score;
          }
        });
      })
    },
    getTopStudents: function() {
      let presentationsLength = this._presentations.length

      function sortStudents(student, nextStudent) {
        let studentExamResult = student.examResult,
            studentHomeworkResult = student.homeworks / presentationsLength,
            nextStudentExamResult = nextStudent.examResult,
            nextStudentHomeworkResult = nextStudent.homeworks / presentationsLength,
            studentTotal = (((studentHomeworkResult * 100) / 25) + ((studentExamResult * 100) / 75)) / 2,
            nextStudentTotal = (((nextStudentHomeworkResult * 100) / 25) + ((nextStudentExamResult * 100) / 75)) / 2;

            if(studentTotal > nextStudentTotal) {
              return -1;
            } else if (studentTotal < nextStudentTotal) {
              return 1;
            } else {
              return 0;
            }
      }

      return this.students.sort(sortStudents).slice(0, 10);
    }
  };

  function validateTitle(title) {
    let titleWords = title.split(' ');
    
    validateWord(title);
    titleWords.forEach(x => validateWord(x));
  }

  function validateWord(word) {
    let wordLength = word.length;

    if(wordLength === 0) {
      throw new Error('Title can not be EMPTY string');
    }

    if(word[0] === ' ' || word[wordLength -1] === ' ') {
      throw new Error('Title can not start or end with SPACE');
    }
  }

  function validatePresentations(presentations) {
    if (!presentations) {
      throw new Error('Missing presentations');
    } else if(presentations.length === 0) {
      throw new Error('Presentations can not be empty ARRAY');
    }

    presentations.forEach(title => validateTitle(title));
  }

  function studentNameValidation(studentName) {
    if(!studentName) {
      throw new Error('Student name can not be EMPTY');
    } else if(typeof studentName !== 'string') {
      throw new Error('Student name must be STRING');
    }

    let names = studentName.split(' ');
    if (names.length !== 2) {
      throw new Error('Invalid student name format');
    }

    names.forEach(name => {
      let char = name.charAt(0);

      if(char == char.toLowerCase()) {
        throw new Error('Student name must begin with capital letter');
      }

      for(let i = 1; i < name.length; i++) {
        char = name.charAt(i);
        if (char == char.toUpperCase()) {
          throw new Error('All letters except the first should be LOWERCASE');
        }
      }
    });
  }

  function getId() {
    let currentId = 0;

    return function() {
      return ++currentId;
    }
  }

  return Course;
}


module.exports = solve;