CREATE TABLE users(
	us_id SERIAL NOT NULL PRIMARY KEY,
	us_email VARCHAR(100) NOT NULL,
	us_name VARCHAR(60) NOT NULL,
	us_lastname VARCHAR(60) NOT NULL,
	us_password VARCHAR(255) NOT NULL
);

CREATE TABLE evaluators(
	ev_id SERIAL NOT NULL PRIMARY KEY,
	ev_name VARCHAR(60) NOT NULL,
	ev_email VARCHAR(100) NOT NULL,
	ev_phone VARCHAR(20) NOT NULL,
	ev_horary VARCHAR(200) NOT NULL,
	ev_academic_level VARCHAR(150) NOT NULL,
	ev_status INT NOT NULL
);

CREATE TABLE binnacles(
	bin_id SERIAL NOT NULL PRIMARY KEY,
	bin_return_code INT NOT NULL,
	bin_message VARCHAR(255) NOT NULL,
	bin_datetime TIMESTAMP NOT NULL,
	id_author INT NOT NULL,
	FOREIGN KEY(id_author) REFERENCES users(us_id),
	FOREIGN KEY(id_author) REFERENCES evaluators(ev_id)
);

CREATE TABLE levels(
	lv_id SERIAL NOT NULL PRIMARY KEY,
	lv_name VARCHAR(60) NOT NULL
);

CREATE TABLE locals(
	lc_id SERIAL NOT NULL PRIMARY KEY,
	lc_name VARCHAR(60) NOT NULL
);

CREATE TABLE courses(
	cou_id SERIAL NOT NULL PRIMARY KEY,
	cou_name VARCHAR(60) NOT NULL,
	cou_teacher_guide VARCHAR(120) NOT NULL,
	lv_id INT NOT NULL REFERENCES levels(lv_id),
	lc_id INT NOT NULL REFERENCES locals(lc_id)
);

CREATE TABLE projects(
	pj_id SERIAL NOT NULL PRIMARY KEY,
	pj_name VARCHAR(200) NOT NULL,
	pj_registry_number INT NOT NULL,
	cou_id INT NOT NULL REFERENCES courses(cou_id)
);

CREATE TABLE assignments(
	asg_id SERIAL NOT NULL PRIMARY KEY,
	pj_id INT NOT NULL REFERENCES projects(pj_id),
	ev_id INT NOT NULL REFERENCES evaluators(ev_id)
);
