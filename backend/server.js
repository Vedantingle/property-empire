require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if(err) console.log("❌ Workbench Error:", err.message);
  else console.log("✅ MySQL Workbench Connected!");
});

// CREATE - Fixed to handle missing columns
app.post('/api/players', (req,res)=>{
  const {name, token, color, money} = req.body;
  // Use INSERT that works even if table has extra columns with defaults
  const sql = `INSERT INTO players (name, token, color, money, net_worth, position, in_jail, jail_turns) VALUES (?,?,?,?,?,0,0,0)`;
  db.query(sql, [name, token||'V', color||'#FF6B00', money||1500, money||1500], (e,r)=>{
      if(e) {
        console.error("INSERT Error:", e.message);
        // Try simpler insert if first fails
        db.query('INSERT INTO players (name, token, color, money, net_worth) VALUES (?,?,?,?,?)',
        [name, token||'V', color||'#FF6B00', money||1500, money||1500], (e2,r2)=>{
          if(e2) return res.status(500).json({error: e2.message, original: e.message});
          res.json({player_id: r2.insertId, message: "Player Inserted"});
        });
        return;
      }
      res.json({player_id: r.insertId, message: "Player Inserted"});
  });
});

app.get('/api/players', (req,res)=>{
  db.query('SELECT * FROM players', (e,r)=> {
    if(e) return res.status(500).json({error: e.message});
    res.json(r);
  });
});

app.put('/api/players/:id', (req,res)=>{
  db.query('UPDATE players SET money=?, net_worth=? WHERE player_id=?',
    [req.body.money, req.body.net_worth, req.params.id], (e,r)=> {
      if(e) return res.status(500).json({error: e.message});
      res.json(r);
    });
});

app.delete('/api/players/:id', (req,res)=>{
  db.query('DELETE FROM players WHERE player_id=?', [req.params.id], (e,r)=> {
    if(e) return res.status(500).json({error: e.message});
    res.json(r);
  });
});

// Transactions - with error handling
app.post('/api/transactions', (req,res)=>{
  const {game_id, from_player, to_player, amount, type, property_id, description} = req.body;
  // Handle nulls
  const safeFrom = from_player || 1;
  const safeTo = to_player || 0;
  const safeAmount = amount || 0;
  const safeType = type || 'BUY';
  const safeProp = property_id || null;
  const safeDesc = description || `${safeType} transaction`;
  
  db.query('INSERT INTO transactions (game_id, from_player, to_player, amount, type, property_id, description) VALUES (?,?,?,?,?,?,?)',
    [game_id||1, safeFrom, safeTo, safeAmount, safeType, safeProp, safeDesc], (e,r)=> {
      if(e) {
        console.error("Transaction Insert Error:", e.message);
        return res.status(500).json({error: e.message});
      }
      res.json(r);
    });
});

app.get('/api/transactions', (req,res)=>{
  db.query('SELECT * FROM transactions ORDER BY timestamp DESC LIMIT 50', (e,r)=> {
    if(e) return res.status(500).json({error: e.message});
    res.json(r);
  });
});

app.get('/api/properties', (req,res)=>{
  db.query('SELECT * FROM properties', (e,r)=> {
    if(e) return res.status(500).json({error: e.message});
    res.json(r);
  });
});

app.put('/api/properties/:id', (req,res)=>{
  const {owner_id, houses, mortgaged} = req.body;
  db.query('UPDATE properties SET owner_id=?, houses=?, mortgaged=? WHERE property_id=?',
    [owner_id, houses||0, mortgaged||0, req.params.id], (e,r)=> {
      if(e) return res.status(500).json({error: e.message});
      res.json(r);
    });
});

app.post('/api/games', (req,res)=>{
  db.query('INSERT INTO games (status) VALUES ("ACTIVE")', (e,r)=> {
    if(e) return res.status(500).json({error: e.message});
    res.json({game_id: r.insertId});
  });
});

app.get('/', (req,res)=> res.send("Property Empire Backend Running - Workbench Connected - Fixed"));

app.listen(3000, ()=> console.log("🚀 Backend running on http://localhost:3000 - FIXED VERSION"));
