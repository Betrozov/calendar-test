

import * as express from 'express';
import {Application} from 'express';
import {getAllCourses, getCourseById} from './get-courses.route';
import {getAllEvents, getPoepleAbsenses, getAbsenseReasons, getSinglePersonFullYearAbsenses} from './get-calendar.route';
import {getDummyData} from './get-dummy.route';
import {searchLessons} from './search-lessons.route';
import {saveCourse} from './save-course.route';

const bodyParser = require('body-parser');


const app: Application = express();


app.use(bodyParser.json());

app.route('/api/data').get(getDummyData);

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').put(saveCourse);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/calendar/events').get(getAllEvents);

app.route('/api/calendar/people-absenses').get(getPoepleAbsenses);

app.route('/api/calendar/people-absense-reasons').get(getAbsenseReasons);

app.route('/api/calendar/person-fullyear-absenses').get(getSinglePersonFullYearAbsenses);


const httpServer = app.listen(9000, () => {
    console.log('HTTP REST API Server running at http://localhost:' + httpServer.address().port);
});




