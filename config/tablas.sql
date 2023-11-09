CREATE TABLE InformesDeDonaciones (
                                      informe_id INT AUTO_INCREMENT PRIMARY KEY,
                                      user_id INT,
                                      fecha_creacion DATE NOT NULL,
                                      contenido_informe TEXT NOT NULL,
                                      carrera_destino VARCHAR(255) NOT NULL,
                                      estatus ENUM('Generado por Coordinador', 'Recibido por Administrador', 'Reclamado por Administrador', 'Aceptado') NOT NULL,
                                      FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
-- Tabla para Usuarios
CREATE TABLE Usuarios (
                          user_id INT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL,
                          correo_electronico VARCHAR(255) NOT NULL,
                          contraseña VARCHAR(255) NOT NULL,
                          role_id INT,
                          FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Tabla para Coordinadores de Carrera
CREATE TABLE CoordinadoresDeCarrera (
                                        coordinador_id INT AUTO_INCREMENT PRIMARY KEY,
                                        user_id INT,
                                        carrera VARCHAR(255) NOT NULL,
                                        FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla para Donadores
CREATE TABLE Donadores (
                           donador_id INT AUTO_INCREMENT PRIMARY KEY,
                           user_id INT,
                           rfc VARCHAR(13) NOT NULL,
                           constancia_fiscal VARCHAR(255) NOT NULL,
                            -- Otros atributos específicos para donadores
                           FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla para Administradores del Sistema
CREATE TABLE AdministradoresSistema (
                                        admin_sistema_id INT AUTO_INCREMENT PRIMARY KEY,
                                        user_id INT,
                                        -- Otros atributos específicos para administradores del sistema
                                        FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);

-- Tabla para Administradores de la Unidad Académica
CREATE TABLE AdministradoresUnidadAcademica (
                                                admin_unidad_academica_id INT AUTO_INCREMENT PRIMARY KEY,
                                                user_id INT,
                                                unidad_academica VARCHAR(255) NOT NULL,
    -- Otros atributos específicos para administradores de la unidad académica
                                                FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
CREATE TABLE Donaciones (
                            donacion_id INT AUTO_INCREMENT PRIMARY KEY,
                            user_id INT,
                            monto DECIMAL(10, 2) NOT NULL,
                            fecha_donacion DATE NOT NULL,
                            comprobante VARCHAR(255),
                            FOREIGN KEY (user_id) REFERENCES Usuarios(user_id)
);
CREATE TABLE Roles (
                       role_id INT AUTO_INCREMENT PRIMARY KEY,
                       nombre_del_rol VARCHAR(255) NOT NULL
);