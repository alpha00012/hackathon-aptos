function testDB() {
    const dbName = "aptos";
    const dbVersion = 2;
    const request = window.indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      setDbStatus("Error: Failed to open IndexedDB");
      console.error("IndexedDB error:", event.target.error);
    };

    request.onsuccess = (event) => {
      setDbStatus("Success: IndexedDB opened");
      const db = event.target.result;
      getData(db)
    };

    request.onupgradeneeded = (event) => {
      console.log("entered here")
      const db = event.target.result;
      const objectStore = db.createObjectStore("users", { keyPath: "id" });
      objectStore.createIndex("name", "name", { unique: false });
      setDbStatus("Success: Object store created");
      console.log("created object store");
    };
  }

  function addData(db) {
    const transaction = db.transaction(["users"], "readwrite");
    const objectStore = transaction.objectStore("users");
    const user = { id: 1, name: "John Doe", email: "john@example.com" };

    const request = objectStore.add(user);

    request.onsuccess = () => {
      setDbStatus("Success: Data added to IndexedDB");
      getData(db);
    };

    request.onerror = (event) => {
      setDbStatus("Error: Failed to add data");
      console.error("Error adding data:", event.target.error);
    };
  }

  function getData(db) {
    const transaction = db.transaction(["users"], "readonly");
    const objectStore = transaction.objectStore("users");
    const request = objectStore.get(1);

    request.onsuccess = (event) => {
      if (event.target.result) {
        setData(event.target.result);
        setDbStatus("Success: Data retrieved from IndexedDB");
      } else {
        setDbStatus("Error: No data found");
      }
    };

    request.onerror = (event) => {
      setDbStatus("Error: Failed to retrieve data");
      console.error("Error getting data:", event.target.error);
    };
  }
