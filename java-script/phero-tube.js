const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await (response.json());


    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab">
            <button onclick="loadData(${category.category_id})" class="btn hover:bg-primary-color hover:text-white">${category?.category}</button>
        </a>
        `;
        tabContainer.appendChild(div);
    });
}


const loadData = async (category_id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await (response.json());

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (data.data && data.data.length > 0) {

        data.data?.forEach((card) => {
            console.log(card);
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card bg-base-100 shadow-xl">
                <figure>
                    <img class=" max-h-44 w-full" src= ${card?.thumbnail}/>
                </figure>

                <div class="relative flex justify-end">
                ${card?.others?.posted_date ? `<div class="bg-black text-white font-bold w-2/4 absolute bottom-2 right-2 rounded-md"> 
                        <p class="py-2 text-center text-xs">
                          ${card?.others?.posted_date}
                        </p>
                   </div>` : ''}
                </div>

                <div class="card-body">
                    <div class="card-footer">
                        <div class="flex">
                            <div>
                                <div class="avatar online">
                                    <div class="w-14 rounded-full">
                                        <img
                                            src=${card?.authors[0]?.profile_picture}
                                        />   
                                    </div>
                                </div>
                            </div>
                            <div class="ml-3">
                                <h2 class="card-title">${card?.title}</h2>
                                <div>
                                    <p class="mr-3 flex">
                                        ${card?.authors[0]?.profile_name}  

                                        ${card?.authors[0]?.verified ? '<img class="w-6 ml-2" src="images/blue-check.png">' : '<img class="w-6 ml-2 hidden" src="images/blue-check.png">'}
                                    </p>
                                </div>
                                <p>${card?.others?.views} Views</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         `;
            cardContainer.appendChild(div);
        });
        noContent(false);
    }
    else {
        noContent(true);
    }
}


const noContent = (isAvailable) => {
    const content = document.getElementById('no-content');
    if (isAvailable) {
        content.classList.remove('hidden');
    }
    else {
        content.classList.add('hidden');
    }
}


handleCategory();
loadData('1000');