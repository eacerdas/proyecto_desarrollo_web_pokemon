const nodemailer = require("nodemailer")
//accesar a las variables de entorno
require("dotenv").config()

const sendRegistrationEmail=(pnombre,pemail,ppassword)=>{
    let transporter = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.MAILUSER,//su cuenta del equipo
            pass:process.env.PASS //el api key que genera gmail
        },
        connectionTimeout:5*60*1000,
        tls:{
            rejectUnauthorized: false, 
            ciphers:"SSLv3"
        },
        logger:true,
        debug:true
    })

    let mail_options={
        from:process.env.MAILUSER,
        to:pemail,
        subject:"Confirmación de Cuenta",
        html: `
        <table border="0" cellpadding="0" cellspacing="0" width="100%" background-color="#6b7a8f" bgcolor="#2d3436">
        <tr height="500px">  
          <td bgcolor="" width="100%">
            <h1 style="color: #fff; text-align:center">Bienvenido</h1>
            <p  style="color: #fff; text-align:center">
              <span style="color: #f7822f">${pnombre}</span> 
              a la aplicación
            </p>
            <p style="color: #fff; text-align:center">Su clave temporal de acceso es:</p>
            <p  style="color: #fff; text-align:center">
              <span style="color: #f7822f">${ppassword}</span> 
              por favor cámbiela al entrar.
            </p>
          </td>
        </tr>
      </table>
      `
    }

    transporter.sendMail(mail_options,(error,info)=>{
        if(error){
            console.log(error)
        }else{
            console.log("El correo se envio correctamente: ",info.response)
        }
    })


}

module.exports = {sendRegistrationEmail}
