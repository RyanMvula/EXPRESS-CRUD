const express = require('express');
const mustacheExpress = require('mustache-express');
const {Client} = require('pg')

const app = express();
const mustache = mustacheExpress();
mustache.cache =null;
app.engine('mustache',mustache);
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

//Landing
app.get('/',(req,res)=>{
    res.render('index');
});

//Display items
app.get('/home',(req,res)=>{

    const client = new Client({
        host: 'localhost',
        user: 'ryan',
        database: 'mobilestore',
        password: 'password',
        port: '5432'
    });

    client.connect()
    .then(()=>{
        return client.query('SELECT * FROM phones');
    })
    .then((results)=>{
        console.log(results);
        res.render('phones',results);
    });

});

app.get('/add',(req,res)=>{
    res.render('add-phones');
});

// Add items
app.post('/phones/add',(req,res)=>{
    console.log('post body', req.body);

    const client = new Client({
        host: 'localhost',
        user: 'ryan',
        database: 'mobilestore',
        password: 'password',
        port: '5432'
    });

    client.connect()
    .then(()=>{
        console.log('connection complete');
        const sql = 'INSERT INTO phones (name,count,brand) VALUES($1, $2, $3)';
        const params = [req.body.name, req.body.count, req.body.brand];
        return client.query(sql,params);
    })
    .then((result)=>{
        console.log('results?', result);
        res.redirect('/home');
    });

});

// Delete items
app.post('/phones/delete/:id', (req,res)=>{
    const client = new Client({
        host: 'localhost',
        user: 'ryan',
        database: 'mobilestore',
        password: 'password',
        port: '5432'
    });

    client.connect()
    .then(()=>{
        const sql = 'DELETE FROM phones WHERE pid = $1';
        const params = [req.params.id];
        return client.query(sql,params);
    })
    .then((results)=>{
        res.redirect('/home');
    });
});

// Edit items
app.get('/phones/edit/:id',(req,res)=>{
    const client = new Client({
        host: 'localhost',
        user: 'ryan',
        database: 'mobilestore',
        password: 'password',
        port: '5432'
    });

    client.connect()
    .then(()=>{
        const sql = 'SELECT * FROM phones WHERE pid = $1';
        const params = [req.params.id];
        return client.query(sql,params);
    })
    .then((results)=>{
        console.log('results? ', results)
        res.render('phones-edit', { data: results.rows[0] } );
    });
});

//Post after editing
app.post('/phones/edit/:id',(req,res)=>{
    const client = new Client({
        host: 'localhost',
        user: 'ryan',
        database: 'mobilestore',
        password: 'password',
        port: '5432'
    });

    client.connect()
    .then(()=>{
        const sql = 'UPDATE phones SET name=$1, count=$2, brand=$3 WHERE pid = $4';
        const params = [req.body.name,req.body.count,req.body.brand,req.params.id];
        return client.query(sql,params);
    })
    .then((results)=>{
        res.redirect('/home');
    });
})

app.listen(8000,(req,res)=>{
    console.log("server is running");
}); 