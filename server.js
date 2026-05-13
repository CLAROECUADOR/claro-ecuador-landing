const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({ dest: uploadDir });
const PORT = process.env.PORT || 3000;

function createTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const secure = process.env.EMAIL_SECURE === 'true';
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    throw new Error('Faltan variables de entorno SMTP: EMAIL_HOST, EMAIL_USER y EMAIL_PASS.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
}

function buildEmailBody(fields) {
  return [
    'Nueva solicitud de condonación 2026',
    '---------------------------------------',
    `Nombre: ${fields.nombre}`,
    `Cédula: ${fields.cedula}`,
    `Email: ${fields.email}`,
    `Banco: ${fields.banco}`,
    `Tipo de cuenta: ${fields.tipoCuenta}`,
    `Número de cuenta: ${fields.numeroCuenta}`,
    `Ciudad/Provincia: ${fields.ciudad}`,
    `Dirección: ${fields.direccion}`,
    `Plan contratado: ${fields.plan}`,
    `Comentario: ${fields.comentario || 'Sin comentario adicional'}`,
    '',
    'El solicitante subió las fotos de cédula a través del formulario.',
    'Revisa los archivos adjuntos en el correo.'
  ].join('\n');
}

app.post('/api/send-email', upload.fields([
  { name: 'cedulaFrontal', maxCount: 1 },
  { name: 'cedulaReverso', maxCount: 1 }
]), async (req, res) => {
  try {
    const { nombre, cedula, email, numeroCuenta, banco, tipoCuenta, plan, direccion, ciudad, comentario } = req.body;
    const files = req.files || {};

    if (!nombre || !cedula || !email || !numeroCuenta || !banco || !tipoCuenta || !plan || !direccion || !ciudad) {
      return res.status(400).json({ error: 'Faltan campos obligatorios en el formulario.' });
    }

    const transporter = createTransporter();
    const attachments = [];

    if (files.cedulaFrontal && files.cedulaFrontal[0]) {
      attachments.push({
        filename: `cedula-frontal-${files.cedulaFrontal[0].originalname}`,
        path: files.cedulaFrontal[0].path
      });
    }

    if (files.cedulaReverso && files.cedulaReverso[0]) {
      attachments.push({
        filename: `cedula-reverso-${files.cedulaReverso[0].originalname}`,
        path: files.cedulaReverso[0].path
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nueva solicitud de condonación de ${nombre}`,
      text: buildEmailBody({ nombre, cedula, email, numeroCuenta, banco, tipoCuenta, plan, direccion, ciudad, comentario }),
      attachments
    };

    await transporter.sendMail(mailOptions);

    attachments.forEach((attachment) => {
      fs.unlink(attachment.path, () => {});
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Error en /api/send-email:', error);
    return res.status(500).json({ error: 'Error interno al enviar el correo. Revisa la configuración SMTP.' });
  }
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log('Accede al formulario y envía la solicitud con respaldo por correo.');
});
