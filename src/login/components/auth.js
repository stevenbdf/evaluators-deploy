import axios from '../../main/admin/components/candidates/axios.js';
import Swal from 'sweetalert2';

class Auth{
    constructor(){
        this.authenticated =false;
    }

    async login(cb,email,password){
        const res = await axios.get(`users/findByEmail/${email}`)
        const respuesta = res.data.msg;
        if(respuesta.users!==undefined){
            if(respuesta.users[0].us_email === email && respuesta.users[0].us_password === password){
                await Swal.fire(
                    '¡Bienvenido!',
                    `${respuesta.users[0].us_name}`,
                    'success'
                )
                this.authenticated = true;
            }else{
                console.log('Credenciales incorrectas')
                await Swal.fire(
                    '¡Usuario y/o contraseña incorrecto!',
                    'Intentalo de nuevo',
                    'error'
                )
            }
        }else{
            await Swal.fire(
                '¡Usuario no encontrado!',
                'Verifica tus credenciales',
                'error'
            )
            this.authenticated = false;
        }
        cb()
    }

    logout(cb){
        this.authenticated = false;
        cb()
    }

    isAuthenticated(){
        return this.authenticated;
    }

}

export default new Auth()