import {test,expect} from 'playwright/test';
import { SandboxPage } from './Pages/SandBoxPage'; 

test.describe('Acciones en el Automation @Sandbox', () => {
    test('Click en el Botón ID Dinámico', async ({page}) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Hacer click en el botón con ID dinámico', async() => {
            const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID' });
            await botonIDDinamico.click();
            await expect(page.getByText('OMG, aparezco después de 3'), 'No se encontró el mensaje después de 3 segundos').toBeVisible()
        })
    })

    //Solo se puede llenar texto en elementos que lo permiten: Input, textArea y contentEditable
    test('Lleno un campo de texto en Automation @Sandbox', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Ingreso texto en el campo Un Aburrido Texto', async () => {
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill("Estoy aprendiendo Playwright")
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }), 'El texbox no es editable').toBeEditable();
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }), 'El textbox no tiene el valor deseado').toHaveValue("Estoy aprendiendo Playwright");
        })

    })

    test('Puedo seleccionar y deseleccionar un CheckBox', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })
        
        await test.step('Puedo seleccionar el checkBox Pasta', async () => {
            const sandbox = new SandboxPage(page)
            //await page.getByLabel('Pasta 🍝').check();
            await sandbox.checkPasta();
            
            await expect(sandbox.pastaCheckbox, 'El checkbox no estaba seleccionado').toBeChecked();
        })

        await test.step('Puedo deseleccionar el checkbox Pasta', async () => {
            await page.getByLabel('Pasta 🍝').uncheck();
            await expect(page.getByLabel('Pasta 🍝'), 'el checkbox Pasta está seleccionado').not.toBeChecked();
        })
        
        
    })

    test('Puedo seleccionar Radio Buttons', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Puedo seleccionar el radio Button para No', async () => {
            await page.getByRole('radio', { name: 'No' }).check();
            await expect(page.getByRole('radio', { name: 'No' })).toBeChecked();
        })
        
    })
    
    //Para seleccionar un item del dropdown es necesario crear una lista con los elementos del dropdown e iterar para recorrerla
    test('Puedo seleccionar un item del Dropdown', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Puedo seleccionar un deporte del dropdown', async () => {
            const deportes = ['Fútbol', 'Tennis', 'Basketball'];
            for(let deporte of deportes){
                const elemento = await page.$(`select#formBasicSelect > option:is(:text("${deporte}"))`)
                if(elemento) {
                    console.log(`La opción '${deporte}' está presente`)
                }else {
                    throw new Error(`Opción '${deporte}' no está presente en la lista`)
                }
            }
        })
    })

    test('Puedo seleccionar un item del segundo Dropdown', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Selecciono un día de la semana', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            await page.getByRole('link', { name: 'Martes' }).click();
        })
        
    })
    
    test.skip('Puedo subir archivos a Automation Sandbox', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })
        
        await test.step('', async () => {
            await page.getByLabel('Upload file').setInputFiles(['pathAlArchivo.pdf', 'archivoDos.pdf'])
            await page.getByLabel('Upload file').setInputFiles([]) // remover archivos
        })
    })

    test.skip('Puedo hacer un Drag and Drop de elementos en Automation Sandbox', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Hago un Drag and Drop correctamente', async () => {
            await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'))
        })
    
    })

    test('Valido la columna Nombres de la tabla estática', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Puedo validar los elementos para la columna Nombre de la tabla estática', async () => {
            const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent))
            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

            expect(valoresColumnaNombres).toEqual(nombresEsperados);
        })
        
    })

    test('Valido la segunda columna de la tabla dinámica', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Valido que los valores cambiaron al hacer un reload a la web ', async () => {
            //Creamos el primer arreglo con todos los valores de la tabla dinámica
            const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresTablaDinamica);

            //Recargamos la página
            await page.reload();

            //Creamos el segundo arreglo con todos los valores de la tabla dinámica
            const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresPostReload);

            expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
        })
        
    })

    test('Ejemplo de Soft Assertions', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/')
        })

        await test.step('Valido que todos los elementos del checkbox son correctos', async () => {
            await expect.soft(page.getByText('Pizza 🍕')).toBeVisible()
            await expect.soft(page.getByText('Hamburguesas 🍔'), 'No se encontró el elemento esperado').toBeVisible()
            await expect.soft(page.getByText('Pasta 🍝')).toBeVisible()
            await expect.soft(page.getByText('Helado 🍧')).toBeVisible()
            await expect.soft(page.getByText('Torta 🍰')).toBeVisible()
        })
        
    })

    test('Puedo validar un elemento dentro del popup', async ({ page }) => {
        await test.step('Navego al Sandbox de Free Range Testers', async() => {
            await page.goto('https://thefreerangetester.github.io/sandbox-automation-testing/');
        })

        await test.step('Hacer click en el botón popup', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
        })
    })
    
    /*
    Ejemplo aplicado en popup
    const popupPromise = page.waitForEvent('popup')
    await page.getByText('open the popup').click();
    const popup = await popupPromise;
    await popup.wait ForLoadState();
    console.log(await  popup.title(''))
    */
    
    
    
})