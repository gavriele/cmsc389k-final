
# Professordex

---

Name: Gabriel Epstein (0101), Michael Zheng (0201), Justin Chao (0101)

Date: December 6th, 2019

Project Topic: Stats on professors. Gotta catch 'em all!

URL: https://professor-dex.herokuapp.com/

---


### 1. Data Format and Storage
Schemas for data sets on MongoDB (with lists of their fields):

Data point fields:
- `Field 1`: title                `Type: String`
- `Field 2`: suggestedLevel       `Type: Number`
- `Field 3`: xp                   `Type: Number`
- `Field 4`: reward               `Type: [String]`
- `Field 5`: content              `Type: String`

1. Professors
  `Field 1`: name                 `Type: String`
  `Field 2`: strength             `Type: String`
  `Field 3`: weakness             `Type: String`
  `Field 4`: classes              `Type: String`
  `Field 5`: reviews              `Type: reviewSchema`
2. Grades
  `Field 1`: grade                `Type: Number`
  `Field 2`: class                `Type: String`
  `Field 3`: review               `Type: reviewSchema`
  `Field 4`: professor            `Type: String`
`Field 3`: Classes
  `Field 1`: title                `Type: String`
  `Field 2`: professor            `Type: String`
  `Field 3`: grades               `Type: Number`
4. reviewSchema (NOT an independent data set)
  `Field 1`: Rating               `Type: Number`
  `Field 2`: Comment              `Type: String`
  `Field 3`: Author               `Type: String`


Schema: 
```javascript
classSchema = {
    rating: {
        type: Number,
        min: 0.00,
        max: 5.00,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
  };

gradeSchema = {
    grade: {
        type: Number,
        min: 0.0,
        max: 100.0,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    review: {
        type: reviewSchema,
        required: true
    },
    professor: {
        type: String,
        required: true
    }
};

professorSchema = {
    name: {
        type: String,
        required: true
    },
    strength: {
        type: [String]
    },
    weakness: {
        type: [String]
    },
    classes: {
        type: [String],
        required: true
    },
    reviews: {
        type: [reviewSchema]
    },
    description: {
        type: String,
    }
};

reviewSchema = {
    rating: {
        type: Number,
        min: 0.00,
        max: 5.00,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
};
```

### 2. How we implemented sockets

 1. Submit a grade in json using a socket from a class page to the server
 2. The server receives the json object, adds the grade to the Grade database and corresponding class, and sends a success message back to the client through the socket.

### 3. Handlebars pages

1. Main
2. Form for submitting a new prof entry
3. Professor page
4. UMD page
5. Form for submitting a grade
6. Description (about us)
  1. Group members

### 4. Express.js endpoints (<> is a variable) and what they do:

   1. Get /api/<prof>/grades
      1. List of grades for professor
   2. Get /api/professors
      1. List of all professors
   3. Get /api/grades/
      1. List of all grades
   4. Get /api/professor/<name>
      1. Stats of specific professor
   5. Get /api/classes (Gavriel)
      1. List of all classes
   6. Get /api/class/<class>
      1. Stats about class
   7. Post /api/post/grade
      1. submit a grade
   8. Post /api/curve 
      1. Curve all grades in a class to As 
      2. Request body should contain class:<title>
   9. Post /api/post/form
      1. Submit a form to add a professor
   10. Post /api/post/grade
      1. Submit a grade for a specific professor/class
   11. Delete /api/fire/<prof>
      1. Delete a specific professor
   12. Delete /api/nuke   
      1. Delete ALL GRADES

Example Node.js POST request to endpoint: 
```javascript
/*---------------Inside of form.handlebars---------------*/
$.ajax({
    type: "POST",
    url: 'http://localhost:3000/api/post/form',
    contentType: "application/json",
    data: sendInfo,
    sucess: function (data, status) {
        console.log(data);
    }
});
/*---------------Inside of index.js---------------*/
var addForm = require('./API/routes/addForm');
app.use("/api/post/form", addForm);

/*-------Inside of /API/routes/addForm.js---------*/
const addForm = async (req, res) => {
   // Saving professor to the mongodb
};
router.post('/', addForm);
module.exports = router;
```

### 5. Modules

   1. MongoConnect()
   2. Class schema
   3. Grade schema
   4. Professor schema
   5. Review schema
   6. Router
      1. addGrade function
      2. addForm function
      3. GetAllClasses function
      4. GetAllGrades function
      5. GetAllProfessors function
      6. Curve function
      7. Nuke function
   7. addGradeSocket function
   8. fireProfessor function
   9. getProfessor function
   10. getClass function
   11. classPage page
   12. homePage page
   13. professorPage page
   14. profForm page

### 6. NPM Packages

1. Bootstrap
2. Chalk
3. Node-fetch

### 7. UI

1. It looks nice! (in our opinion)

### 8. Heroku

1. We spent many hours trying to debug Heroku, but could not resolve an “R10 (Boot timeout) -> Web process failed to bind to $PORT” error

### 9. README and documentation.md

see README and this document