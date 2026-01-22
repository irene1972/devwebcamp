import { FormGroup } from "@angular/forms";

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

export function eliminar_tag(index: number,tags:string[],miForm: FormGroup) {
    tags.splice(index, 1);
    miForm.get('tags')?.setValue(tags.join(','));
  }