CREATE TABLE InformesDeDonaciones (
                                      informe_id INT AUTO_INCREMENT PRIMARY KEY,
                                      user_id INT,
                                      fecha_creacion DATE NOT NULL,
                                      contenido_informe TEXT NOT NULL,
                                      carrera_destino VARCHAR(255) NOT NULL,
                                      estatus ENUM('Generado por Coordinador', 'Recibido por Administrador', 'Reclamado por Administrador', 'Aceptado') NOT NULL,
                                      FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
CREATE TABLE Usuarios (
                          user_id INT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL,
                          correo_electronico VARCHAR(255) NOT NULL,
                          contraseña VARCHAR(255) NOT NULL,
                          role_id INT,
                          rfc VARCHAR(13), -- Campo para almacenar el RFC
                          constancia_fiscal VARCHAR(255), -- Ruta o nombre de archivo de la constancia fiscal
                          FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);
CREATE TABLE CoordinadoresDeCarrera (
                                        coordinador_id INT AUTO_INCREMENT PRIMARY KEY,
                                        user_id INT,
                                        carrera VARCHAR(255) NOT NULL,
                                        FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
CREATE TABLE Donaciones (
                            donacion_id INT AUTO_INCREMENT PRIMARY KEY,
                            user_id INT,
                            monto DECIMAL(10, 2) NOT NULL,
                            fecha DATE NOT NULL,
                            destino VARCHAR(255) NOT NULL,
                            FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
CREATE TABLE Roles (
                       role_id INT AUTO_INCREMENT PRIMARY KEY,
                       nombre_del_rol VARCHAR(255) NOT NULL
);