import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

export function insertar_tags(event: KeyboardEvent, tags: string[], miForm: FormGroup) {
    const input = event.target as HTMLInputElement;

    // Detectar Enter o Coma
    if (event.key === 'Enter' || event.key === ',') {
        event.preventDefault(); // Evita submit del form o coma en el input

        const valor = input.value.trim();
        if (!valor) return;

        // Separar por comas por si hay más de un tag
        valor.split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0)
            .forEach(tag => {
                if (!tags.includes(tag)) {
                    tags.push(tag);
                }
            });

        // Limpiar input y actualizar el FormControl
        input.value = '';
        miForm.get('tags')?.setValue(tags.join(','));
    }
}

export function eliminar_tag(index: number, tags: string[], miForm: FormGroup) {
    tags.splice(index, 1);
    miForm.get('tags')?.setValue(tags.join(','));
}

export function autenticarPanelAdmin(router: Router) {
    //recuperar el token del local storage
    var token = localStorage.getItem('token');
    var email = localStorage.getItem('email');

    if (email) {
        //usuario autenticado
        //consultar a bd para obtener si es admin o no   
        fetch(`${environment.apiUrl}api/auth/isAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    router.navigate(['/login']);
                }

                if (data.mensaje !== 1) {
                    router.navigate(['/login']);
                }
                console.log(data);
                //El usuario es admin y está autentificado
            })
            .catch(error => {
                console.log(error);
                router.navigate(['/login']);
            });

    } else {
        //extraer email del token
        fetch(`${environment.apiUrl}api/auth/decodificar-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ token: token })
        })
            .then(response => response.json())
            .then(data => {

                if (data.decoded !== 'error') {
                    //usuario autenticado
                    const email = data.decoded.user;
                    localStorage.setItem('email', email);

                } else {
                    console.log('data.decoded -> error');
                    router.navigate(['/login']);
                }

            })
            .catch(error => {
                console.log(error);
                router.navigate(['/login']);
            });
    }

}