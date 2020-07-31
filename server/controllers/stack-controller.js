const db = require('../models/models.js');
const stackController = {};

//populates a 'deck' with stored technology cards and returns them to client
stackController.getStack = async (req, res, next) => {
  try {
  const queryText = `
  SELECT techInStack."stackName" AS stackArr, techInStack."techName" AS techArr, 
    todo.name AS todoName, todo.details AS todoDetails, 
    todo.completed AS todoStatus, 
    tech.name AS tech_name,
    tech.url, tech.completed AS tech_completed FROM techInStack
  INNER JOIN todo
  ON todo.tech = techInStack."techName"
  INNER JOIN tech
  ON todo.tech = tech.name`;
  const techInStackQuery = `  
  SELECT * 
  FROM techinstack`;
  const techInStackTable = await db.query(techInStackQuery);
  const output = {};
  techInStackTable.rows.forEach((row) => {
    if (output[row.stackName])
      output[row.stackName].push({ name: row.techName, url: null, todo: [] });
    else output[row.stackName] = [{ name: row.techName, url: null, todo: [] }];
  });
  const todoTable = await db.query(queryText);
  todoTable.rows.forEach((todo) => {
    const {
      stackarr,
      techarr,
      todoname,
      tododetails,
      todostatus,
      tech_name,
      url,
    } = todo;
    output[stackarr].forEach((tech) => {
      if (tech.name === techarr) {
        tech.url = url;
        tech.todo.push({
          taskName: todoname,
          details: tododetails,
          completed: todostatus,
        });
      }
    });
  });
  res.locals.output = output
  return next()
}
  catch(err) {return next(err)}
};

module.exports = stackController;
