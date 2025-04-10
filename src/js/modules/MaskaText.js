export default function MaskaText() {
    // Основная функция форматирования
    window.formatPhoneNumber = function(input, isBackspace = false, cursorPos) {
        // Получаем текущие значения
        let value = input.value.replace(/\D/g, '');
        const selectionStart = cursorPos !== undefined ? cursorPos : input.selectionStart;
        const isDeleting = isBackspace || (input.value.length > 0 && selectionStart < input.selectionEnd);

        // Автодобавление +7 если начинаем с цифры
        if (/^[78]/.test(value)) {
            value = '7' + value.substring(1);
        } else if (/^\d/.test(value)) {
            value = '7' + value;
        }

        // Очистка если пусто или только 7
        if (!value || value === '7') {
            input.value = '';
            return { value: '', pos: 0 };
        }

        // Форматируем номер
        let formatted = '+7';
        let mask = '+7 (XXX) XXX-XX-XX';
        let newValue = '';
        let i = 0;
        let j = 1; // Пропускаем первую 7 (она уже в +7)

        // Строим отформатированную строку
        for (; i < mask.length && j < value.length; i++) {
            if (mask[i] === 'X') {
                newValue += value[j++];
            } else {
                newValue += mask[i];
            }
        }

        // Удаляем лишние символы маски
        if (i < mask.length && mask[i] !== 'X') {
            newValue += mask[i];
        }

        input.value = newValue;

        // Вычисляем новую позицию курсора
        let newPos = selectionStart;

        if (isDeleting) {
            // При удалении - ставим курсор перед удаленным символом
            newPos = Math.max(4, selectionStart);
        } else {
            // При вводе - двигаем курсор вперед через разделители
            if (value.length > 1) {
                const lastPos = newValue.length - 1;
                const currentChar = newValue[newPos];
                
                // Пропускаем разделители при вводе
                if (currentChar === ' ' || currentChar === '(' || currentChar === ')' || currentChar === '-') {
                    newPos++;
                }
                
                // Не выходим за границы
                newPos = Math.min(newPos, lastPos + 1);
            }
        }

        // Запрещаем курсору становиться внутрь +7
        if (newPos < 3) newPos = 3;

        return { value: newValue, pos: newPos };
    };

    // Обработчик событий для поля телефона
    const phoneInput = document.getElementById('userPhone');
    if (phoneInput) {
        // Обработка ввода
        phoneInput.addEventListener('input', function(e) {
            const result = window.formatPhoneNumber(this);
            this.setSelectionRange(result.pos, result.pos);
        });

        // Обработка Backspace/Delete
        phoneInput.addEventListener('keydown', function(e) {
            const cursorPos = this.selectionStart;
            const isBackspace = e.key === 'Backspace';
            const isDelete = e.key === 'Delete';

            if (isBackspace || isDelete) {
                e.preventDefault();
                
                // Запрещаем удаление +7
                if (cursorPos <= 3 && isBackspace) return;
                if (cursorPos <= 2 && isDelete) return;

                // Получаем текущее значение без форматирования
                let value = this.value.replace(/\D/g, '');
                
                // Определяем позицию для удаления
                let deletePos = cursorPos;
                if (isBackspace) {
                    // Ищем предыдущую цифру
                    while (deletePos > 0 && !/\d/.test(this.value[deletePos - 1])) {
                        deletePos--;
                    }
                    deletePos--;
                } else {
                    // Ищем следующую цифру
                    while (deletePos < this.value.length && !/\d/.test(this.value[deletePos])) {
                        deletePos++;
                    }
                }

                // Удаляем цифру
                if (deletePos >= 0 && deletePos < this.value.length && /\d/.test(this.value[deletePos])) {
                    const digitIndex = Array.from(this.value.slice(0, deletePos + 1)).filter(c => /\d/.test(c)).length - 1;
                    value = value.substring(0, digitIndex) + value.substring(digitIndex + 1);
                    
                    // Обновляем значение
                    this.value = value;
                    const result = window.formatPhoneNumber(this, true, isBackspace ? deletePos : cursorPos);
                    this.value = result.value;
                    this.setSelectionRange(result.pos, result.pos);
                }
            }
        });

        // Автодобавление +7 при фокусе
        phoneInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7 ';
                this.setSelectionRange(4, 4);
            } else if (this.value.length < 3) {
                this.value = '+7 ';
                this.setSelectionRange(4, 4);
            }
        });

        // Запрет ввода нецифр
        phoneInput.addEventListener('keypress', function(e) {
            if (!/\d/.test(e.key) && e.key !== '+' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
            }
        });
    }

    // Санитизация других полей
    window.sanitizeInput = function(input) {
        input.value = input.value.replace(/<[^>]*>/g, '');
        
        if (input.id === 'userName') {
            input.value = input.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
        }
        
        if (input.id === 'userEmail' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            input.setCustomValidity(emailRegex.test(input.value) ? '' : 'Пожалуйста, введите корректный email');
        }
    };

    // Обработка вставки для всех полей
    document.querySelectorAll('.submit__container-form-input').forEach(input => {
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text');
            const sanitized = text.replace(/<[^>]*>/g, '');
            document.execCommand('insertText', false, sanitized);
            
            if (input.id === 'userPhone') {
                const result = window.formatPhoneNumber(input);
                input.setSelectionRange(result.pos, result.pos);
            }
        });
        
        input.addEventListener('input', function() {
            window.sanitizeInput(this);
        });
    });
}