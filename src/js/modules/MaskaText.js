export default function MaskaText() {
    window.formatPhoneNumber = function(input, isBackspace = false, cursorPos) {
        let value = input.value.replace(/\D/g, '');
        const selectionStart = cursorPos !== undefined ? cursorPos : input.selectionStart;
        const isDeleting = isBackspace || (input.value.length > 0 && selectionStart < input.selectionEnd);

        if (/^[78]/.test(value)) {
            value = '7' + value.substring(1);
        } else if (/^\d/.test(value)) {
            value = '7' + value;
        }

        if (!value || value === '7') {
            input.value = '';
            return { value: '', pos: 0 };
        }

        let formatted = '+7';
        let mask = '+7 (XXX) XXX-XX-XX';
        let newValue = '';
        let i = 0;
        let j = 1; 

        for (; i < mask.length && j < value.length; i++) {
            if (mask[i] === 'X') {
                newValue += value[j++];
            } else {
                newValue += mask[i];
            }
        }

        if (i < mask.length && mask[i] !== 'X') {
            newValue += mask[i];
        }

        input.value = newValue;

        let newPos = selectionStart;

        if (isDeleting) {
            newPos = Math.max(4, selectionStart);
        } else {
            if (value.length > 1) {
                const lastPos = newValue.length - 1;
                const currentChar = newValue[newPos];
                
                if (currentChar === ' ' || currentChar === '(' || currentChar === ')' || currentChar === '-') {
                    newPos++;
                }
    
                newPos = Math.min(newPos, lastPos + 1);
            }
        }
        if (newPos < 3) newPos = 3;

        return { value: newValue, pos: newPos };
    };

    const phoneInput = document.getElementById('userPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const result = window.formatPhoneNumber(this);
            this.setSelectionRange(result.pos, result.pos);
        });

        phoneInput.addEventListener('keydown', function(e) {
            const cursorPos = this.selectionStart;
            const isBackspace = e.key === 'Backspace';
            const isDelete = e.key === 'Delete';

            if (isBackspace || isDelete) {
                e.preventDefault();
                
                if (cursorPos <= 3 && isBackspace) return;
                if (cursorPos <= 2 && isDelete) return;

                let value = this.value.replace(/\D/g, '');
                
                let deletePos = cursorPos;
                if (isBackspace) {
                    while (deletePos > 0 && !/\d/.test(this.value[deletePos - 1])) {
                        deletePos--;
                    }
                    deletePos--;
                } else {
                    while (deletePos < this.value.length && !/\d/.test(this.value[deletePos])) {
                        deletePos++;
                    }
                }

                if (deletePos >= 0 && deletePos < this.value.length && /\d/.test(this.value[deletePos])) {
                    const digitIndex = Array.from(this.value.slice(0, deletePos + 1)).filter(c => /\d/.test(c)).length - 1;
                    value = value.substring(0, digitIndex) + value.substring(digitIndex + 1);
                    
                    this.value = value;
                    const result = window.formatPhoneNumber(this, true, isBackspace ? deletePos : cursorPos);
                    this.value = result.value;
                    this.setSelectionRange(result.pos, result.pos);
                }
            }
        });

        phoneInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7 ';
                this.setSelectionRange(4, 4);
            } else if (this.value.length < 3) {
                this.value = '+7 ';
                this.setSelectionRange(4, 4);
            }
        });

        phoneInput.addEventListener('keypress', function(e) {
            if (!/\d/.test(e.key) && e.key !== '+' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
            }
        });
    }

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