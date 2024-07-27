import { collection,getDoc,doc,query,where,getDocs ,addDoc,GeoPoint, Timestamp,onSnapshot} from 'firebase/firestore';
import db from '@/lib/firebase/firestore'



//real time documents update
export const subscribeToCollection = (collectionName: string, callback: (data: any[]) => void) => {
  const collectionRef = collection(db, collectionName);
  return onSnapshot(collectionRef, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    callback(data);
  });
};


// get users or guides
export const getDocuments = async (coll:string) => {
  try {
    const collectionRef = collection(db, coll)
    const querySnapshot = await getDocs(collectionRef)
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return data;
  }
  catch(err){
    console.error("Error getting documents", err);
    throw err;
  }
  }

  export async function getMultipleDocuments<T extends { id: string }>(
    collectionName: string, 
    ids: string[]
  ): Promise<T[]> {
    const q = query(collection(db, collectionName), where('__name__', 'in', ids))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
  }

//get a user or trip by id
  export const getDocumentById = async(collection:string,id:string)=>{
    try{
    const ref=doc(db,collection,id);
    const snap = await getDoc(ref);
    if (snap.exists()){
      return snap.data()
    }
    else {
      console.log("doesnt exist")
      return null;
    }
  }
  catch(error){
    console.error(`Error getting document(${collection}) by ID: `, error)
    throw error;
  }
  }

//get only guides 
export const getGuides = async () => {
  try {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .filter((user) => user.role === "guide");
    return data;
  } catch (err) {
    console.error("Error getting guides", err);
    throw err; // Re-throw the error for the caller to handle
  }
};


//for filtering
export const getDocumentsByAttribute = async (collectionName:string, attributeName:string, attributeValue:string) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(attributeName, "==", attributeValue)); //add where clauses for many constraints
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return documents;

  } catch (err) {
    console.error("Error getting documents by attribute", err);
    throw err;
  }
};


//this was actually a mistake because of the rerendering
export async function addSampleTrips() {
  const tripsCollection = collection(db, 'trips');

  const sampleTrips = [
    {
      capacity: 10,
      city: "Sousse",
      date: Timestamp.fromDate(new Date("2024-07-20")),
      description: "Sousse Tour is a captivating travel experience in the city of Sousse, Tunisia. Known for its rich history, stunning Mediterranean coastline, and vibrant culture, the trip offers visitors a chance to explore the ancient Medina, a UNESCO World Heritage site with narrow alleys, bustling markets, and historic architecture.",
      geoPoint: new GeoPoint(35.82143, 10.634422),
      guides: ["3eGUCtK3IRhH4z4dsBoU"],
      price: "700",
      title: "Sousse Tour"
    },
    {
      capacity: 15,
      city: "Tunis",
      date: Timestamp.fromDate(new Date("2024-08-15")),
      description: "Explore the vibrant capital of Tunisia, with its mix of modern and ancient attractions. Visit the famous Bardo Museum and wander through the historic Medina.",
      geoPoint: new GeoPoint(36.8065, 10.1815),
      guides: ["4fHVDuL4JSiI5z5etCpV"],
      price: "800",
      title: "Tunis Explorer"
    },
    {
      capacity: 8,
      city: "Djerba",
      date: Timestamp.fromDate(new Date("2024-09-05")),
      description: "Experience the beauty of Djerba, an island off the coast of Tunisia. Enjoy pristine beaches, visit traditional villages, and explore the unique blend of Arab, African, and Mediterranean cultures.",
      geoPoint: new GeoPoint(33.8075, 10.8451),
      guides: ["5gWEDvM5KTjJ6z6fuDqW"],
      price: "900",
      title: "Djerba Island Getaway"
    },
    {
      capacity: 12,
      city: "Carthage",
      date: Timestamp.fromDate(new Date("2024-10-10")),
      description: "Step back in time with a visit to the ancient city of Carthage. Explore the ruins of this once-mighty empire, including the Antonine Baths, Byrsa Hill, and the Carthage Museum.",
      geoPoint: new GeoPoint(36.8526, 10.3284),
      guides: ["6hXFEvN6LUkK7z7gvErX"],
      price: "750",
      title: "Carthage Historical Tour"
    },
    {
      capacity: 20,
      city: "Sahara",
      date: Timestamp.fromDate(new Date("2024-11-20")),
      description: "Embark on an unforgettable desert adventure in the Sahara. Ride camels, sleep in traditional Berber camps, and witness stunning sunsets over the dunes.",
      geoPoint: new GeoPoint(31.5072, 9.3817),
      guides: ["7iYGFwO7MVlL8z8hwFsY"],
      price: "1200",
      title: "Sahara Desert Expedition"
    },
    {
      capacity: 14,
      city: "Sidi Bou Said",
      date: Timestamp.fromDate(new Date("2025-03-15")),
      description: "Visit the picturesque town of Sidi Bou Said, known for its striking blue and white architecture. Enjoy panoramic views of the Mediterranean, explore local art galleries, and savor traditional Tunisian cuisine.",
      geoPoint: new GeoPoint(36.8688, 10.3417),
      guides: ["8jZHGxP8NWmM9z9ixGtZ"],
      price: "600",
      title: "Sidi Bou Said Art and Culture"
    }
  ];

  for (const trip of sampleTrips) {
    try {
      const docRef = await addDoc(tripsCollection, trip);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  }
}

