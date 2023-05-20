class Producto{
    ////Atributos
    nombre;
    cantidad;
    id;
    precio;

constructor(id,nombre,cantidad,precio){
    this.id = id
    this.nombre = nombre
    this.cantidad = cantidad
    this.precio = precio
}

    subTotal = () => {
        return this.precio*this.cantidad;
    }
}