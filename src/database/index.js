import mysql from 'mysql';
import config from '../config';

class Database {
  constructor(name, props) {
    this.props = props;
    this.name = name;
  }

  creating = () => {
    const connection = mysql.createConnection(config.mysql);
    const props = this.props;
    
    const fields = Object.keys(props).map((field) => (
      `${field} ${props[field].dataType} ${props[field].nullStr} ${props[field].more || ''}`
    ));

    const queryStr = `create table if not exists ${this.name}(
      id int primary key auto_increment,
      ${fields.join(', ')}
    )`;

    connection.connect((err) => {
      if (err) { return err; }

      connection.query(queryStr, (err, results, fields) => {
        connection.end();

        if (err) { return err; }

        return results;
      });
    });
  }

  inserting = (entity) => {
    const connection = mysql.createConnection(config.mysql);
    
    const fields = Object.keys(this.props).sort();
    const values = fields.map((field) => (
      `'${entity[field] || this.props[field].defVal}'`
    ));
    
    const queryStr = `INSERT INTO ${this.name}(${fields.join(',')}) VALUES(${values.join(',')})`;
    
    return new Promise((resolve, reject) => {
      connection.query(queryStr, (err, results) => {
        connection.end();

        if (err) { return reject({ status: 0, error: err }); }

        resolve({ status: 1, results });
      });
    });
  };

  selectAll = () => {
    const connection = mysql.createConnection(config.mysql);
    const queryStr = `SELECT * FROM ${this.name}`;

    return new Promise((resolve, reject) => {
      connection.query(queryStr, (error, results) => {
        connection.end();

        if (error) { return reject(error); }
        resolve(results);
      });
    });
  };

  selectByClause = ({ conditions, selectList }) => {
    const connection = mysql.createConnection(config.mysql);
    const queryStr = `SELECT ${selectList} FROM ${this.name} WHERE ${conditions}`;

    return new Promise((resolve, reject) => {
      connection.query(queryStr, (error, results) => {
        connection.end();
        
        if (error) { return reject(error); }

        resolve(results);
      });
    });
  }
  
  updating = (id, valObj) => {
    const connection = mysql.createConnection(config.mysql);
    const newVal = Object.keys(valObj).map((field) => (
      `${field} = '${valObj[field]}'`
    ));

    const queryStr = `UPDATE ${this.name} SET ${newVal.join(', ')} WHERE id = ${id}`;

    return new Promise((resolve, reject) => {
      connection.query(queryStr, (error, results) => {
        connection.end();

        if (error) { return reject(error); }

        resolve(results);
      });
    });
  }

  deleting = (id) => {
    const queryStr = `DELETE FROM todos WHERE id = ${id}`;

    connection.query(queryStr, 1, (error, results, fields) => {
      if (error)
        return console.error(error.message);

      console.log('Deleted Row(s):', results.affectedRows);
    });
  }
}


export default Database;
