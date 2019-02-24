function createNewCafe(arr) {
    db.collection('cafes').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            arr.push({
                name: doc.data().name,
                city: doc.data().city
            });
        });
        console.log('Cafes List Ready:', arr)
    }).catch(err => {
        console.log(err);
    });
}

function createOldCafe(arr) {
    db.collection('cafesHistory').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            arr.push({
                name: doc.data().name,
                city: doc.data().city
            });
        });
        console.log('Cafes History List Ready:', arr)
    }).catch(err => {
        console.log(err);
    });
}

function addCafeItem(data, arr) {
    if (data.name !== '' && data.city !== '') {
        // New item to 'cafes'
        db.collection('cafes').add({
            name: data.name,
            city: data.city
        }).then(() => {
            // Render the new item to frontend views
            arr.push({
                name: data.name,
                city: data.city
            });

            data.name = '';
            data.city = '';
        });
    }
}

function deleteCafeItem(name, arr, id) {
    // Get the very 'cafes' item
    db.collection('cafes').where('name', '==', name).get().then(snapshot => {
        // Trade to history cafes list
        snapshot.docs.forEach(doc => {
            db.collection('cafesHistory').add({
                name: doc.data().name,
                city: doc.data().city
            });
        });

        // Delete the very 'cafes' item
        snapshot.forEach(doc => {
            doc.ref.delete();
        });
    }).then(() => {
        arr.splice(id, 1);
    });
}

function recoverCafeItem(name, arr, id) {
    // Get the very 'cafesHistory' item
    db.collection('cafesHistory').where('name', '==', name).get().then(snapshot => {
        // Trade to cafes list
        snapshot.docs.forEach(doc => {
            db.collection('cafes').add({
                name: doc.data().name,
                city: doc.data().city
            });
        });

        // Delete the very 'cafesHistory' item
        snapshot.forEach(doc => {
            doc.ref.delete();
        });
    }).then(() => {
        arr.splice(id, 1);
    });
}

function deleteCafeItemSure(name, arr, id) {
    db.collection('cafesHistory').where('name', '==', name).get().then(snapshot => {
        snapshot.forEach(doc => {
            doc.ref.delete();
        });
    }).then(() => {
        arr.splice(id, 1);
    });
}

function switchListMode(ref) {
    ref = (ref === 'new-cafe') ? 'old-cafe' : 'new-cafe';
}
