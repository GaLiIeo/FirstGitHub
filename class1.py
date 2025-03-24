"""
Date: 02/03/2025
Update: 02/10/2025 
Author: Aniket Mishra
Purpose: Staff Payroll Management System with OOP and exception handling
"""
#I have taken help in try and error syntax from https://www.w3schools.com/python/python_try_except.asp and Blackbox AI

from abc import ABC, abstractmethod

# This section defines the Staff class and the StaffManager class for managing staff operations.
class Staff(ABC):
    #Representing a staff member with core attributes
    # Initializes the staff member with a name and staff ID.

    def __init__(self, name, staff_id):
        self._name = name  # Staff member's name (encapsulated)
        self._staff_id = staff_id  # Staff member's ID (encapsulated)
    
    # Getters for staff attributes
    def get_name(self):
        return self._name
    
    def get_staff_id(self):
        return self._staff_id
    
    # Setters for staff attributes with validation
    def set_name(self, name):
        if not name.strip():
            raise ValueError("Name cannot be empty")
        self._name = name
    
    def set_staff_id(self, staff_id):
        if not staff_id.strip():
            raise ValueError("Staff ID cannot be empty")
        self._staff_id = staff_id
    
    @abstractmethod
    def calculate_salary(self):
        #Abstract method to be implemented by child classes
        pass
    
    def __str__(self):
        return f"Name: {self._name}, ID: {self._staff_id}"

class PartTimeStaff(Staff):
    #Representing a part-time staff member
    # Initializes the part-time staff with specific attributes.

    def __init__(self, name, staff_id, hourly_rate, hours_worked):
        super().__init__(name, staff_id)
        self._hourly_rate = hourly_rate  # Hourly rate (encapsulated)
        self._hours_worked = hours_worked  # Hours worked (encapsulated)
    
    # Getters for part-time staff attributes
    def get_hourly_rate(self):
        return self._hourly_rate
    
    def get_hours_worked(self):
        return self._hours_worked
    
    # Setters for part-time staff attributes with validation
    def set_hourly_rate(self, rate):
        if rate <= 0:
            raise ValueError("Hourly rate must be positive")
        self._hourly_rate = rate
    
    def set_hours_worked(self, hours):
        if hours < 0:
            raise ValueError("Hours worked cannot be negative")
        self._hours_worked = hours
    
    def calculate_salary(self):
        return self._hourly_rate * self._hours_worked

class FullTimeStaff(Staff):
    #Representing a full-time staff member
    # Initializes the full-time staff with specific attributes.

    def __init__(self, name, staff_id, annual_salary, bonus=0):
        super().__init__(name, staff_id)
        self._annual_salary = annual_salary  # Annual salary (encapsulated)
        self._bonus = bonus  # Bonus amount (encapsulated)
    
    # Getters for full-time staff attributes
    def get_annual_salary(self):
        return self._annual_salary
    
    def get_bonus(self):
        return self._bonus
    
    # Setters for full-time staff attributes with validation
    def set_annual_salary(self, salary):
        if salary <= 0:
            raise ValueError("Annual salary must be positive")
        self._annual_salary = salary
    
    def set_bonus(self, bonus):
        if bonus < 0:
            raise ValueError("Bonus cannot be negative")
        self._bonus = bonus
    
    def calculate_salary(self):
        return self._annual_salary + self._bonus

class Intern(Staff):
    #Representing an intern staff member
    # Initializes the intern with specific attributes.
    # Assumptions:
    # 1. Interns receive a stipend instead of salary
    # 2. Maximum internship duration is 6 months
    # 3. Interns work 40 hours per week
    # 4. No overtime pay for interns
    # 5. No benefits or bonuses for interns

    def __init__(self, name, staff_id, stipend, duration_months):
        super().__init__(name, staff_id)
        self._stipend = stipend  # Monthly stipend (encapsulated)
        self._duration_months = duration_months  # Duration in months (encapsulated)
    
    # Getters for intern attributes
    def get_stipend(self):
        return self._stipend
    
    def get_duration_months(self):
        return self._duration_months
    
    # Setters for intern attributes with validation
    def set_stipend(self, stipend):
        if stipend <= 0:
            raise ValueError("Stipend must be positive")
        self._stipend = stipend
    
    def set_duration_months(self, months):
        if not 1 <= months <= 6:
            raise ValueError("Internship duration must be between 1 and 6 months")
        self._duration_months = months
    
    def calculate_salary(self):
        return self._stipend * self._duration_months

class StaffManager:
    #Will Manages the staff operations and file persistence
    # Initializes the staff manager and loads existing staff data.

    def __init__(self):
        self.staff_list = []
        self.load_staff()
    
    def load_staff(self):
        #Load staff data from file with error handling
        #This method attempts to read staff data from 'stafflist.txt' and handles errors if the file is not found or cannot be accessed.

        try:
            with open('stafflist.txt', 'r') as file:
                for line in file:
                    data = line.strip().split(',')
                    if len(data) >= 2:
                        staff_type = data[0]
                        name = data[1]
                        staff_id = data[2]
                        
                        if staff_type == 'PT':
                            hourly_rate = float(data[3])
                            hours_worked = float(data[4])
                            self.staff_list.append(PartTimeStaff(name, staff_id, hourly_rate, hours_worked))
                        elif staff_type == 'FT':
                            annual_salary = float(data[3])
                            bonus = float(data[4]) if len(data) > 4 else 0
                            self.staff_list.append(FullTimeStaff(name, staff_id, annual_salary, bonus))
                        elif staff_type == 'IN':
                            stipend = float(data[3])
                            duration = int(data[4])
                            self.staff_list.append(Intern(name, staff_id, stipend, duration))
        except FileNotFoundError:
            self.initialize_file()
        except (PermissionError, OSError) as e:
            print(f"Critical error: {str(e)}")
            exit()
    
    def initialize_file(self):
        #Create new staff file if not exists
        #This method will creates a new staff file if it does not already exist, handling any potential file access errors.

        try:
            open('stafflist.txt', 'w').close()
        except (PermissionError, OSError) as e:
            print(f"File creation failed: {str(e)}")
            exit()
    
    def save_staff(self):
        #Save the staff data to file with error handling
        #This method writes the current staff list to 'stafflist.txt' and handles any errors that may occur during the process.

        try:
            with open('stafflist.txt', 'w') as file:
                for staff in self.staff_list:
                    if isinstance(staff, PartTimeStaff):
                        file.write(f"PT,{staff.get_name()},{staff.get_staff_id()},{staff.get_hourly_rate()},{staff.get_hours_worked()}\n")
                    elif isinstance(staff, FullTimeStaff):
                        file.write(f"FT,{staff.get_name()},{staff.get_staff_id()},{staff.get_annual_salary()},{staff.get_bonus()}\n")
                    elif isinstance(staff, Intern):
                        file.write(f"IN,{staff.get_name()},{staff.get_staff_id()},{staff.get_stipend()},{staff.get_duration_months()}\n")
        except (PermissionError, OSError) as e:
            raise RuntimeError(f"Save failed: {str(e)}")
    
    def add_staff(self, staff):
        #Add new staff member with validation
        #This method adds a new staff member to the list after validating the input to ensure it is not empty and does not duplicate existing names.

        if not staff.get_name().strip():
            raise ValueError("Staff name cannot be empty")
        if any(s.get_staff_id() == staff.get_staff_id() for s in self.staff_list):
            raise ValueError("Staff ID already exists")
        
        original_list = self.staff_list.copy()
        self.staff_list.append(staff)
        
        try:
            self.save_staff()
        except RuntimeError as e:
            self.staff_list = original_list
            raise e
    
    def modify_staff(self, staff_id, new_data):
        #Modify existing staff member with validation
        #This method updates the information of an existing staff member after validating the input.

        staff = next((s for s in self.staff_list if s.get_staff_id() == staff_id), None)
        if not staff:
            raise ValueError("Staff not found")
        
        original_data = {
            'name': staff.get_name(),
            'staff_id': staff.get_staff_id()
        }
        
        try:
            if 'name' in new_data:
                staff.set_name(new_data['name'])
            if 'staff_id' in new_data and new_data['staff_id'] != staff_id:
                if any(s.get_staff_id() == new_data['staff_id'] for s in self.staff_list):
                    raise ValueError("Staff ID already exists")
                staff.set_staff_id(new_data['staff_id'])
            
            if isinstance(staff, PartTimeStaff):
                if 'hourly_rate' in new_data:
                    staff.set_hourly_rate(new_data['hourly_rate'])
                if 'hours_worked' in new_data:
                    staff.set_hours_worked(new_data['hours_worked'])
            elif isinstance(staff, FullTimeStaff):
                if 'annual_salary' in new_data:
                    staff.set_annual_salary(new_data['annual_salary'])
                if 'bonus' in new_data:
                    staff.set_bonus(new_data['bonus'])
            elif isinstance(staff, Intern):
                if 'stipend' in new_data:
                    staff.set_stipend(new_data['stipend'])
                if 'duration_months' in new_data:
                    staff.set_duration_months(new_data['duration_months'])
            
            self.save_staff()
        except (ValueError, RuntimeError) as e:
            staff.set_name(original_data['name'])
            staff.set_staff_id(original_data['staff_id'])
            raise e
    
    def delete_staff(self, staff_id):
        #Delete staff member with validation
        #This method removes a staff member from the list after validating that the staff exists.

        staff = next((s for s in self.staff_list if s.get_staff_id() == staff_id), None)
        if not staff:
            raise ValueError("Staff not found")
        
        original_list = self.staff_list.copy()
        self.staff_list.remove(staff)
        
        try:
            self.save_staff()
        except RuntimeError as e:
            self.staff_list = original_list
            raise e
    
    def view_staff(self):
        #Display all staff members list
        #This method prints the current list of staff members, or a message if no members are found.

        if not self.staff_list:
            print("No staff members found")
            return
        
        print("\nCurrent Staff List:")
        for idx, staff in enumerate(self.staff_list, 1):
            staff_type = "Part-Time" if isinstance(staff, PartTimeStaff) else \
                        "Full-Time" if isinstance(staff, FullTimeStaff) else "Intern"
            print(f"{idx}. {staff_type} - {staff.get_name()} (ID: {staff.get_staff_id()})")
            print(f"   Salary/Stipend: ${staff.calculate_salary():.2f}")

def get_staff_input(staff_type):
    #Helper function to get input for different staff types
    #This function prompts the user for staff information based on the selected staff type.

    name = input("Enter staff name: ").strip()
    staff_id = input("Enter staff ID: ").strip()
    
    if staff_type == 'PT':
        hourly_rate = float(input("Enter hourly rate: "))
        hours_worked = float(input("Enter hours worked: "))
        return PartTimeStaff(name, staff_id, hourly_rate, hours_worked)
    
    elif staff_type == 'FT':
        annual_salary = float(input("Enter annual salary: "))
        bonus = float(input("Enter bonus (0 if none): "))
        return FullTimeStaff(name, staff_id, annual_salary, bonus)
    
    elif staff_type == 'IN':
        stipend = float(input("Enter monthly stipend: "))
        duration = int(input("Enter duration in months (1-6): "))
        return Intern(name, staff_id, stipend, duration)

def get_modification_input(staff):
    #Helper function to get modification input for staff
    #This function prompts the user for updated staff information.

    new_data = {}
    
    print("\nEnter new values (press Enter to keep current value):")
    name = input(f"Name [{staff.get_name()}]: ").strip()
    if name:
        new_data['name'] = name
    
    staff_id = input(f"Staff ID [{staff.get_staff_id()}]: ").strip()
    if staff_id:
        new_data['staff_id'] = staff_id
    
    if isinstance(staff, PartTimeStaff):
        hourly_rate = input(f"Hourly Rate [{staff.get_hourly_rate()}]: ").strip()
        if hourly_rate:
            new_data['hourly_rate'] = float(hourly_rate)
        
        hours_worked = input(f"Hours Worked [{staff.get_hours_worked()}]: ").strip()
        if hours_worked:
            new_data['hours_worked'] = float(hours_worked)
    
    elif isinstance(staff, FullTimeStaff):
        annual_salary = input(f"Annual Salary [{staff.get_annual_salary()}]: ").strip()
        if annual_salary:
            new_data['annual_salary'] = float(annual_salary)
        
        bonus = input(f"Bonus [{staff.get_bonus()}]: ").strip()
        if bonus:
            new_data['bonus'] = float(bonus)
    
    elif isinstance(staff, Intern):
        stipend = input(f"Monthly Stipend [{staff.get_stipend()}]: ").strip()
        if stipend:
            new_data['stipend'] = float(stipend)
        
        duration = input(f"Duration in months [{staff.get_duration_months()}]: ").strip()
        if duration:
            new_data['duration_months'] = int(duration)
    
    return new_data

def menu():
    #Displays the interactive user menu
    #This function presents the user with options to add, modify, delete, view staff, or exit the program.

    print("\nOptions:")
    print("A --> Add new staff")
    print("M --> Modify staff")
    print("D --> Delete staff")
    print("V --> View all staff")
    print("E --> Exit")

def main():
    #Main program execution
    #This function initializes the StaffManager and runs the main loop for user interaction.

    print("Welcome to Staff Payroll Management System")
    manager = StaffManager()
    
    while True:
        menu()
        choice = input("Enter your choice: ").upper()
        
        try:
            if choice == 'A':
                print("\nSelect staff type:")
                print("PT --> Part-Time Staff")
                print("FT --> Full-Time Staff")
                print("IN --> Intern")
                staff_type = input("Enter staff type: ").upper()
                
                if staff_type not in ['PT', 'FT', 'IN']:
                    print("❌ Failed: Invalid staff type selected")
                    continue
                
                staff = get_staff_input(staff_type)
                manager.add_staff(staff)
                print(f"✅ Success: Staff member {staff.get_name()} has been added successfully")
            
            elif choice == 'M':
                staff_id = input("Enter staff ID to modify: ").strip()
                staff = next((s for s in manager.staff_list if s.get_staff_id() == staff_id), None)
                
                if not staff:
                    print("❌ Failed: Staff member not found")
                    continue
                
                new_data = get_modification_input(staff)
                if not new_data:
                    print("❌ Failed: No changes were made")
                    continue
                
                manager.modify_staff(staff_id, new_data)
                print("✅ Success: Staff information has been updated successfully")
            
            elif choice == 'D':
                staff_id = input("Enter staff ID to delete: ").strip()
                if manager.delete_staff(staff_id):
                    print("✅ Success: Staff member has been deleted successfully")
            
            elif choice == 'V':
                manager.view_staff()
            
            elif choice == 'E':
                print("✅ Success: Thank you for using Staff Payroll Management System")
                print("Exiting system...")
                break
            
            else:
                print("❌ Failed: Invalid choice selected. Please select A/M/D/V/E")
        
        except (ValueError, RuntimeError) as e:
            print(f"❌ Failed: {str(e)}")
        except Exception as e:
            print(f"❌ Failed: An unexpected error occurred: {str(e)}")

if __name__ == "__main__":
    main()
