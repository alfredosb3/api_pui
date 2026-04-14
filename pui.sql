-- db: pui


CREATE TABLE `busquedas` (
  `id` VARCHAR(75) NOT NULL,
  `curp` VARCHAR(18) NOT NULL,
  `nombre` VARCHAR(50) DEFAULT NULL,
  `primer_apellido` VARCHAR(50) DEFAULT NULL,
  `segundo_apellido` VARCHAR(50) DEFAULT NULL,
  `fecha_nacimiento` DATE DEFAULT NULL,
  `fecha_desaparicion` DATE DEFAULT NULL,
  `lugar_nacimiento` VARCHAR(20) NOT NULL COMMENT 'Mapeado a estados o valores como DESCONOCIDO o FORÁNEO',
  `sexo_asignado` CHAR(1) DEFAULT NULL COMMENT 'Valores: H, M, X',
  `telefono` VARCHAR(15) DEFAULT NULL,
  `correo` VARCHAR(50) DEFAULT NULL,
  `direccion` VARCHAR(500) DEFAULT NULL,
  `calle` VARCHAR(50) DEFAULT NULL,
  `numero` VARCHAR(20) DEFAULT NULL,
  `colonia` VARCHAR(50) DEFAULT NULL,
  `codigo_postal` VARCHAR(5) DEFAULT NULL,
  `municipio_o_alcaldia` VARCHAR(100) DEFAULT NULL,
  `entidad_federativa` VARCHAR(40) DEFAULT NULL,
  
  /* Campos administrativos adicionales recomendados */
  `estado_busqueda` ENUM('ACTIVA', 'INACTIVA') DEFAULT 'ACTIVA' COMMENT 'Para administrar la baja por el endpoint desactivar-reporte',
  `fecha_registro` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY `id`),
  INDEX `idx_curp` (`curp`),
  INDEX `idx_estado` (`estado_busqueda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Registro de reportes enviados por la Plataforma Única de Identidad';



CREATE TABLE `logs` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `evento` VARCHAR(100) NOT NULL COMMENT 'Categoría del evento: LOGIN, ACTIVAR_REPORTE, DESACTIVAR_REPORTE, ERROR, etc.',
  `descripcion` TEXT NULL COMMENT 'Detalles específicos del evento o mensaje de error',
  `usuario` VARCHAR(100) NULL COMMENT 'Identificador, correo o usuario de quien hizo la petición (si aplica)',
  `ip_origen` VARCHAR(45) NULL COMMENT 'Dirección IP desde la que se consumió el endpoint',
  `metodo` VARCHAR(10) NULL COMMENT 'Método HTTP: POST, GET, PUT, etc.',
  `ruta` VARCHAR(255) NULL COMMENT 'Ruta de la petición original, ej: /api/login',
  `user_agent` VARCHAR(255) NULL COMMENT 'Navegador o cliente desde el que se hace la petición',
  `estado_http` INT NULL COMMENT 'Código de respuesta: 200, 400, 500, etc.',
  `fecha_hora` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora exacta del evento',
  PRIMARY KEY (`id`),
  INDEX `idx_evento` (`evento`),
  INDEX `idx_usuario` (`usuario`),
  INDEX `idx_fecha_hora` (`fecha_hora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabla para auditoría y registro de eventos del sistema';

