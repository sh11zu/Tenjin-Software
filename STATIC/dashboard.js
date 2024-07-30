document.addEventListener('DOMContentLoaded', function() {
    var calendar = new VanillaCalendar({
        selector: "#calendar",
        shortWeekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        onSelect: (data, elem) => {
            console.log(data, elem)
        }
    });
    calendar.init();
});

function toggleSelection(card) {
    const selectedCards = document.querySelectorAll('.card.selected');
    selectedCards.forEach(selectedCard => {
        selectedCard.classList.remove('selected');
    });
    card.classList.add('selected');
}
