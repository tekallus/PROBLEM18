import { useState, useEffect } from "react";

// Sonsuz döngüyü düzelttim
export default function InputChanges() {
  const [value, setValue] = useState("");
  const [count, setCount] = useState(-1);

  //herhangi bir bağımlılık (dependency) belirtilmediği için, useEffect içindeki kod her render işlemi sırasında çalışır
  //setCount fonksiyonu aracılığıyla count state'ini güncellediği için sürekli olarak bir yeniden render işlemi başlatır.
  //düzeltmek için, useEffect hook'u içerisine bir bağımlılık eklememiz gerekiyor
  //Bu bağımlılık, count state'ine bağlı olduğu için, her count değiştiğinde çalışacaktır. Bu sayede sonsuz döngüyü engellemiş oluruz.

  useEffect(() => {
    // Her render işlemi sırasında değil, sadece count değiştiğinde çalışmasi icin setCount(c=>c + 1); burdan alalim
    //useEffect içinde setCount(c => c + 1); kullanarak, herhangi bir input değişikliği olmasa bile her render işlemi sırasında count state'ini bir artırıyor.
    // bu da sürekli bir yeniden render işlemi döngüsüne yol açiyor

    console.log("useEffect çalıştı");
  }, [count]);

  function onChange(event) {
    setValue(event.target.value);
    // Her input değişikliğinde count'u bir arttır
    setCount((c) => c + 1);
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <label
        htmlFor="changes"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Toplam değişiklikler ( {count})
      </label>
      <div className="mt-2">
        <input
          id="changes"
          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
