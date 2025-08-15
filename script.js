document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meter-form');
    const meterPhotoInput = document.getElementById('meter-photo');
    const fileNameSpan = document.getElementById('file-name');

    // Update file name display when a file is chosen
    meterPhotoInput.addEventListener('change', () => {
        if (meterPhotoInput.files.length > 0) {
            fileNameSpan.textContent = meterPhotoInput.files[0].name;
        } else {
            fileNameSpan.textContent = 'Ningún archivo seleccionado';
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const meterNumber = document.getElementById('meter-number').value;
        const kwhReading = document.getElementById('kwh-reading').value;
        const photoFile = meterPhotoInput.files[0];

        const now = new Date();
        const date = now.toLocaleDateString('es-ES');
        const time = now.toLocaleTimeString('es-ES');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const data = {
                    meterNumber,
                    kwhReading,
                    photoFileName: photoFile ? photoFile.name : 'No photo',
                    date,
                    time,
                    latitude,
                    longitude
                };

                displayData(data);

            }, (error) => {
                console.error("Error getting location: ", error);
                alert('No se pudo obtener la ubicación GPS. Asegúrese de haber concedido los permisos.');

                const data = {
                    meterNumber,
                    kwhReading,
                    photoFileName: photoFile ? photoFile.name : 'No photo',
                    date,
                    time,
                    latitude: 'No disponible',
                    longitude: 'No disponible'
                };
                displayData(data);
            });
        } else {
            alert('La geolocalización no es compatible con este navegador.');
            const data = {
                    meterNumber,
                    kwhReading,
                    photoFileName: photoFile ? photoFile.name : 'No photo',
                    date,
                    time,
                    latitude: 'No disponible',
                    longitude: 'No disponible'
                };
            displayData(data);
        }
    });

    function displayData(data) {
        const alertMessage = `
            Registro Guardado:
            --------------------
            Número de Medidor: ${data.meterNumber}
            Lectura (kWh): ${data.kwhReading}
            Foto: ${data.photoFileName}
            Fecha: ${data.date}
            Hora: ${data.time}
            Latitud: ${data.latitude}
            Longitud: ${data.longitude}
        `;
        console.log(data);
        alert(alertMessage);
    }
});
