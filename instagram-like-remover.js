(async function () {

    const BATCH_SIZE = 50;

    const CLICK_DELAY = 150;
    const WAIT_AFTER_SELECT = 1500;
    const WAIT_AFTER_UNLIKE = 5000;

    const SELECT_RETRIES = 30;
    const RETRY_DELAY = 1000;

    const delay = ms =>
        new Promise(resolve => setTimeout(resolve, ms));


    // -----------------------------------------
    // Check if element is visible
    // -----------------------------------------

    function isVisible(el) {

        if (!el) return false;

        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);

        return (
            r.width > 0 &&
            r.height > 0 &&
            s.display !== "none" &&
            s.visibility !== "hidden"
        );
    }


    // -----------------------------------------
    // Find text on the page
    // -----------------------------------------

    function findText(text) {

        const elements = [
            ...document.querySelectorAll(
                "button, [role='button'], a, span, div"
            )
        ];

        const matches = elements.filter(el =>
            isVisible(el) &&
            el.textContent.trim() === text
        );

        if (!matches.length) return null;

        // Prefer the smallest matching element
        matches.sort((a, b) => {

            const ra = a.getBoundingClientRect();
            const rb = b.getBoundingClientRect();

            return (
                ra.width * ra.height -
                rb.width * rb.height
            );
        });

        return matches[0];
    }


    // -----------------------------------------
    // Click
    // -----------------------------------------

    async function clickElement(el) {

        if (!el) return false;

        el.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        await delay(250);

        el.click();

        return true;
    }


    // -----------------------------------------
    // Wait for Select to appear
    // -----------------------------------------

    async function waitForSelect() {

        for (let i = 0; i < SELECT_RETRIES; i++) {

            const select = findText("Select");

            if (select) {
                return select;
            }

            console.log(
                `Waiting for Select... (${i + 1}/${SELECT_RETRIES})`
            );

            await delay(RETRY_DELAY);
        }

        return null;
    }


    // -----------------------------------------
    // Find confirmation Unlike
    // -----------------------------------------

    function findConfirmationUnlike() {

        // First look inside dialog
        const dialogs = [
            ...document.querySelectorAll(
                '[role="dialog"], [aria-modal="true"]'
            )
        ].filter(isVisible);


        for (const dialog of dialogs) {

            const buttons = [
                ...dialog.querySelectorAll(
                    "button, [role='button']"
                )
            ];

            const button = buttons.find(el =>
                isVisible(el) &&
                el.textContent.trim() === "Unlike"
            );

            if (button) {
                return button;
            }
        }


        // Fallback: last visible Unlike
        const buttons = [
            ...document.querySelectorAll(
                "button, [role='button']"
            )
        ].filter(el =>
            isVisible(el) &&
            el.textContent.trim() === "Unlike"
        );

        return buttons.length
            ? buttons[buttons.length - 1]
            : null;
    }


    // -----------------------------------------
    // MAIN LOOP
    // -----------------------------------------

    let batchNumber = 0;

    while (true) {

        batchNumber++;

        console.log(
            `========== BATCH ${batchNumber} ==========`
        );


        // -------------------------------------
        // Wait for Select
        // -------------------------------------

        const selectButton = await waitForSelect();


        if (!selectButton) {

            console.log(
                "Select did not appear after waiting."
            );

            console.log(
                "The script will wait 10 more seconds..."
            );

            await delay(10000);

            continue;
        }


        console.log(
            "Select found."
        );


        // -------------------------------------
        // Click Select
        // -------------------------------------

        await clickElement(selectButton);

        await delay(
            WAIT_AFTER_SELECT
        );


        // -------------------------------------
        // Get checkboxes
        // -------------------------------------

        let checkboxes = [
            ...document.querySelectorAll(
                '[aria-label="Toggle checkbox"]'
            )
        ].filter(isVisible);


        console.log(
            `Found ${checkboxes.length} selectable likes.`
        );


        // -------------------------------------
        // If no checkboxes, wait and retry
        // -------------------------------------

        if (checkboxes.length === 0) {

            console.log(
                "No checkboxes found. Waiting..."
            );


            // Cancel selection mode if necessary
            const cancel = findText("Cancel");

            if (cancel) {
                await clickElement(cancel);
            }


            await delay(3000);

            batchNumber--;

            continue;
        }


        // -------------------------------------
        // Select maximum 50
        // -------------------------------------

        const amount = Math.min(
            BATCH_SIZE,
            checkboxes.length
        );


        console.log(
            `Selecting ${amount} likes...`
        );


        for (let i = 0; i < amount; i++) {

            // Re-query each time because Instagram
            // can modify the DOM.

            const current = [
                ...document.querySelectorAll(
                    '[aria-label="Toggle checkbox"]'
                )
            ].filter(isVisible);


            if (!current[i]) {
                break;
            }


            await clickElement(
                current[i]
            );


            await delay(
                CLICK_DELAY
            );
        }


        console.log(
            `Selected ${amount} likes.`
        );


        await delay(1500);


        // -------------------------------------
        // Click Unlike
        // -------------------------------------

        const unlikeButton =
            findText("Unlike");


        if (!unlikeButton) {

            console.log(
                "Unlike button not found."
            );

            const cancel = findText("Cancel");

            if (cancel) {
                await clickElement(cancel);
            }

            await delay(3000);

            batchNumber--;

            continue;
        }


        console.log(
            "Clicking Unlike..."
        );


        await clickElement(
            unlikeButton
        );


        await delay(1500);


        // -------------------------------------
        // Confirmation
        // -------------------------------------

        let confirmButton = null;


        // Wait a little for dialog
        for (let i = 0; i < 10; i++) {

            confirmButton =
                findConfirmationUnlike();

            if (confirmButton) {
                break;
            }

            await delay(500);
        }


        if (!confirmButton) {

            console.log(
                "Confirmation Unlike not found."
            );

            await delay(3000);

            continue;
        }


        console.log(
            "Confirming Unlike..."
        );


        await clickElement(
            confirmButton
        );


        // -------------------------------------
        // Wait for Instagram to process
        // -------------------------------------

        console.log(
            `Removing ${amount} likes...`
        );


        await delay(
            WAIT_AFTER_UNLIKE
        );


        console.log(
            `Removed ${amount} likes.`
        );


        // -------------------------------------
        // IMPORTANT:
        // Don't stop here.
        //
        // The loop automatically goes back
        // to the top and searches for Select.
        // -------------------------------------

        console.log(
            "Waiting for next batch..."
        );


        await delay(2000);

    }

})();
