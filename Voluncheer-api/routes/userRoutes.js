import {Router} from "express"
import { getAllUsers, getVoluntarios, getONGs } from "./userContrs.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const userRoutes = Router()
userRoutes.get("/usuarios",getAllUsers)
userRoutes.get("/voluntarios",getVoluntarios)
userRoutes.get("/ongs",getONGs)

// Caminho para o seu usuarios.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ajuste o caminho abaixo conforme sua estrutura (Voluncheer-v3/src/database/usuarios.json)
const p = path.join(__dirname, './usuarios.json');

// Função auxiliar para ler o arquivo
const lerUsuarios = () => {
    const data = fs.readFileSync(p, 'utf-8');
    return JSON.parse(data || '[]');
};

// Rota de Cadastro
userRoutes.post('/cadastrar', (req, res) => {
    const usuarios = lerUsuarios();
    const novoUsuario = req.body;

    // Gerando ID incremental
    novoUsuario.id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

    usuarios.push(novoUsuario);

    // Gravando no arquivo usuarios.json
    fs.writeFileSync(p, JSON.stringify(usuarios, null, 2));
    
    res.status(201).json({ message: "Usuário cadastrado com sucesso!", user: novoUsuario });
});

// Rota de Login
userRoutes.post('/login', (req, res) => {
    const { email, senha, tipo } = req.body;
    const usuarios = lerUsuarios();

    const user = usuarios.find(u => u.email === email && u.senha === senha && u.tipo === tipo);

    if (user) {
        res.status(200).json({ message: "Login realizado!", user });
    } else {
        res.status(401).json({ message: "E-mail, senha ou tipo incorretos." });
    }
});


export default userRoutes
