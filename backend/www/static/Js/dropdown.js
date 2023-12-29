document.addEventListener('DOMContentLoaded', (event) => {

    if (valor === 1) {

        const dropdown = document.getElementById('dropdown');
        const dropdownCursos = document.getElementById('dropdownCursos');

        // Fazer uma solicitação GET para a sua API
        fetch('/disciplinas')
            .then(response => response.json())
            .then(data => {
                // Criar um novo array que contém apenas valores únicos
                const uniqueData = [...new Set(data)];

                // Criar e adicionar uma opção em branco
                const blankOption = document.createElement('option');
                blankOption.value = '';
                blankOption.text = '';
                dropdown.add(blankOption);

                // Para cada item na resposta, adicionar uma opção ao dropdown
                uniqueData.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.text = item;
                    dropdown.add(option);
                });
            })
            .catch(error => console.error('Error:', error));

        // Adicionar um event listener para o evento change do dropdown
        dropdown.addEventListener('change', function () {
            // Obtenha a disciplina selecionada
            const disciplinaSelecionada = this.value;

            // Fazer uma solicitação GET para a sua API
            fetch(`/cursos?disciplina=${disciplinaSelecionada}`)
                .then(response => response.json())
                .then(data => {
                    // Criar um novo array que contém apenas valores únicos
                    const uniqueData = [...new Set(data)];

                    // Limpar o dropdown de cursos
                    dropdownCursos.innerHTML = '';

                    // Criar e adicionar uma opção em branco
                    const blankOption = document.createElement('option');
                    blankOption.value = '';
                    blankOption.text = '';
                    dropdownCursos.add(blankOption);

                    // Para cada item na resposta, adicionar uma opção ao dropdown
                    uniqueData.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item;
                        option.text = item;
                        dropdownCursos.add(option);
                    });
                })
                .catch(error => console.error('Error:', error));
        });

        const dropdownHorario = document.getElementById('dropdownHorario');

        // Criar e adicionar uma opção em branco
        const blankOption = document.createElement('option');
        blankOption.value = '';
        blankOption.text = '';
        dropdownHorario.add(blankOption);

        // Adicionar opções manualmente
        const horarios = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

        horarios.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario + ':00';
            option.text = horario;
            dropdownHorario.add(option);
        });

        const dropdownHorarioFinal = document.getElementById('dropdownHorarioFinal');

        // Adicionar um ouvinte de evento ao dropdownHorario
        dropdownHorario.addEventListener('change', () => {
            // Limpar todas as opções existentes em dropdownHorarioFinal
            dropdownHorarioFinal.innerHTML = '';


            // Obter o horário selecionado em dropdownHorario
            const selectedHorario = dropdownHorario.value;

            // Filtrar o array horarios para obter apenas os horários após o horário selecionado
            const horariosFinal = horarios.filter(horario => horario > selectedHorario);

            // Criar e adicionar uma opção em branco
            const blankOption = document.createElement('option');
            blankOption.value = '';
            blankOption.text = '';
            dropdownHorarioFinal.add(blankOption);

            // Adicionar as opções filtradas a dropdownHorarioFinal
            horariosFinal.forEach(horario => {
                const option = document.createElement('option');
                option.value = horario + ':00';
                option.text = horario;
                dropdownHorarioFinal.add(option);
            });
        });


        const dropdownDesmarcar = document.getElementById('dropdownDesmarcar');
        const dropdownCursosDesmarcar = document.getElementById('dropdownCursosDesmarcar');

        // Fazer uma solicitação GET para a sua API
        fetch('/disciplinas')
            .then(response => response.json())
            .then(data => {
                // Criar um novo array que contém apenas valores únicos
                const uniqueData = [...new Set(data)];

                // Criar e adicionar uma opção em branco
                const blankOption = document.createElement('option');
                blankOption.value = '';
                blankOption.text = '';
                dropdownDesmarcar.add(blankOption);

                // Para cada item na resposta, adicionar uma opção ao dropdown
                uniqueData.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item;
                    option.text = item;
                    dropdownDesmarcar.add(option);
                });
            })
            .catch(error => console.error('Error:', error));

        // Adicionar um event listener para o evento change do dropdown
        dropdownDesmarcar.addEventListener('change', function () {
            // Obtenha a disciplina selecionada
            const disciplinaSelecionada = this.value;

            // Fazer uma solicitação GET para a sua API
            fetch(`/cursos?disciplina=${disciplinaSelecionada}`)
                .then(response => response.json())
                .then(data => {
                    // Criar um novo array que contém apenas valores únicos
                    const uniqueData = [...new Set(data)];

                    // Limpar o dropdown de cursos
                    dropdownCursosDesmarcar.innerHTML = '';

                    // Criar e adicionar uma opção em branco
                    const blankOption = document.createElement('option');
                    blankOption.value = '';
                    blankOption.text = '';
                    dropdownCursosDesmarcar.add(blankOption);

                    // Para cada item na resposta, adicionar uma opção ao dropdown
                    uniqueData.forEach(item => {
                        const option = document.createElement('option');
                        option.value = item;
                        option.text = item;
                        dropdownCursosDesmarcar.add(option);
                    });
                })
                .catch(error => console.error('Error:', error));
        });
    }
});