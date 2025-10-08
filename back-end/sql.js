/*import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./banco.db');

db.serialize(() => {
    db.run(
        `
        CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT, 
        email TEXT
        )`
    );

    const stmt = db.prepare(
        `
        INSERT INTO usuarios (nome, email) VALUES (?, ?)`
    );

    stmt.run('João', 'joao@gmail.com');
    stmt.run('Maria', 'maria@gmail.com');
    stmt.finalize();

    db.each('SELECT * FROM usuarios', (error, Linha) => {
        if (error) throw error;
        
        console.log(Linha);
        
    });
});

db.close();
*/